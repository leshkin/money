<template>
  <div id="app">
    <section class="hero is-small is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-5 has-text-centered">
            Укажите траты каждого участника
          </h1>
        </div>
      </div>
    </section>
    <section class="hero is-small">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-7-tablet is-6-desktop is-5-widescreen">
              <table class="table is-fullwidth">
                <tr>
                  <td colspan="5" class="has-text-right">
                    <label class="checkbox has-text-weight-medium is-size-6">
                      <input type="checkbox" v-model="showNameColumn"> показать имена
                    </label>
                  </td>
                </tr>
                <tr v-for="p in participants" :key="p.id">
                  <td v-if="showNameColumn">
                    <input v-model="p.name" @input="clearTransfers()"
                           class="input has-text-weight-medium"
                           type="text"
                           placeholder="Имя">
                  </td>
                  <td>
                    <span @click="addRemoveOneInGroup(p)"
                          class="is-size-4 has-text-right avatar">{{showAvatar(p.id)}}</span>
                  </td>
                  <td>
                    <input :value="p.value"
                           @input="setValue(p, $event.target.value)"
                           ref="input"
                           class="input has-text-weight-medium"
                           type="text"
                           inputmode="tel"
                           placeholder="Сумма">
                    <strong v-if="isPlusSign(p)" class="is-size-6">= {{p.sum}}</strong>
                  </td>
                  <td class="has-text-right">
                    <span @click="remove(p)" class="is-size-7 has-text-right avatar">❌</span>
                  </td>
                </tr>
              </table>
              <div class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <button v-if="canAdd" @click="add()" class="button is-info has-text-weight-semibold">
                      Добавить
                    </button>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <button v-if="canCalculate" @click="calculate()"
                            class="button is-success has-text-weight-semibold">
                      Рассчитать
                    </button>
                  </div>
                </div>
              </div>
              <article v-if="transfers.length > 0" class="message is-warning is-medium">
                <div class="message-header">
                  <p>Делим траты поровну</p>
                </div>
                <div class="message-body has-text-dark">
                  <p v-for="transfer in transfers" :key="transfer.id">
                    <strong>{{showParticipant(transfer.from)}}</strong> переводит
                    <strong>{{transfer.pay}}</strong> для
                    <strong>{{showParticipant(transfer.to)}}</strong>
                  </p>
                </div>
              </article>
              <article v-if="transfers.length === 0 && complete" class="message is-success is-medium">
                <div class="message-header">
                  <p>Все потратили поровну, ничего переводить не надо!</p>
                </div>
                <div class="message-body has-text-centered">👌</div>
              </article>
              <article v-if="complete" class="message is-info is-medium">
                <div class="message-header">
                  <p>Для информации</p>
                </div>
                <div class="message-body has-text-dark">
                  <p>Общая сумма <strong>{{sum}}</strong><p>
                  <p>С каждого по <strong>{{share}}</strong></p>
                </div>
              </article>
              <article class="message is-dark is-medium">
                <div class="message-header">
                  <p>Знаете ли вы?</p>
                </div>
                <div class="message-body has-text-dark">
                  <p>
                    Что кликнув на аватарку, можно создать группу до трёх участников.
                  </p>
                  <p>
                    Например, <strong>кабанчик🐗</strong> тратит деньги в одиночку,
                    а <strong>лисички🦊🦊</strong> — парой, но платит за всё Лис.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .avatar {
    white-space: nowrap;
    cursor: pointer;
  }

  .table td {
    border-width: 0px !important;
  }

  .table td:first-child {
    padding-left: 0;
  }

  .table td:last-child {
    padding-right: 0;
  }
</style>

<script>
  import { transfers } from '@/algorithm'

  export default {
    name: 'App',

    data() {
      return {
        avatars: [ '😼', '🐶', '🐮', '🦆', '🦊', '🐷', '🐼', '🐻', '🐗', '🦉', '🐸',
                   '🦀', '🍄', '🐛', '🐟', '🦔', '🦁', '🐭' ],
        participants: [],
        transfers: [],
        sum: 0,
        share: 0,
        complete: false,
        previousAction: 'add',
        showNameColumn: false,
        sequence: 1
      }
    },

    computed: {
      canAdd: function() {
        return this.avatars.length > 0;
      },

      canCalculate: function() {
        return this.participants.length > 1 && this.participants.every(p => p.sum === 0 || p.sum > 0);
      }
    },

    created: function() {
      this.addOneParticipant();
      this.addOneParticipant();
      this.$nextTick(() => this.$refs.input[0].focus());
    },

    methods: {
      addOneParticipant: function() {
        if (this.avatars.length > 0) {
          const index = Math.floor(Math.random() * this.avatars.length);
          this.participants.push({
            id: this.sequence++,
            avatar: this.avatars[index],
            name: '',
            sum: null,
            value: '',
            count: 1
          });
          this.avatars.splice(index, 1);
        }
      },

      add: function() {
        this.clearTransfers();
        this.addOneParticipant();
        this.$nextTick(() => this.$refs.input[this.participants.length-1].focus());
      },

      addRemoveOneInGroup: function(p) {
        this.clearTransfers();
        if (this.previousAction === 'add') {
          if (p.count < 3) {
            p.count++;
          } else {
            p.count--;
            this.previousAction = 'remove';
          }
        } else {
          if (p.count > 1) {
            p.count--;
          } else {
            p.count++;
            this.previousAction = 'add';
          }
        }
      },

      remove: function(participant) {
        this.clearTransfers();
        this.avatars.push(participant.avatar);
        this.participants = this.participants.filter(p => p.id !== participant.id);
      },

      clearTransfers: function() {
        this.transfers = [];
        this.complete = false;
      },

      calculate: function() {
        const result = transfers(this.participants);
        this.sum = result.sum;
        this.share = result.share;
        this.transfers = result.transfers;
        this.complete = true;
      },

      showAvatar: function(id) {
        const p = this.participants.find(p => p.id === id);
        let result = p.avatar;
        for (let i = 1; i < p.count; i++) {
          result = result + p.avatar;
        }
        return result;
      },

      isPlusSign: function(p) {
        if (p.value && p.value.indexOf('+') > -1) {
          return true;
        } else {
          return false;
        }
      },

      setValue: function(p, value) {
        this.clearTransfers();
        if (value.match(/^[0-9\\+]*$/)) {
          const terms = value.split('+').map(v => Number(v) || 0);
          p.sum = terms.reduce((acc, cur) => acc + cur, 0);
          p.value = value;
        }
      },

      showParticipant: function(id) {
        const p = this.participants.find(p => p.id === id);
        let result = (p.name ? p.name : '') + p.avatar;
        for (let i = 1; i < p.count; i++) {
          result = result + p.avatar;
        }
        return result;
      }
    }
  }
</script>
