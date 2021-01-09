<template>
  <div>
    <div class="columns is-mobile">
      <div class="column is-one-fifth"></div>
      <div class="column">
        <h1 class="title is-5 has-text-centered mt-1">
          {{ $t('header') }}
        </h1>
      </div>
      <div class="column is-one-fifth has-text-right">
        <router-link v-if="locale === 'en'" to="/ru" class="mt-1 mr-1">🇷🇺</router-link>
        <router-link v-if="locale === 'ru'" to="/en" class="mt-1 mr-1">🇬🇧</router-link>
      </div>
    </div>
    <section class="hero is-small">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-7-tablet is-6-desktop is-5-widescreen">
              <table class="table is-fullwidth">
                <tr v-for="p in participants" :key="p.id">
                  <td v-if="showNameColumn">
                    <input v-model="p.name" @input="clearTransfers()"
                           class="input has-text-weight-medium"
                           type="text"
                           :placeholder="$t('name')">
                  </td>
                  <td>
                    <span @click="addRemoveOneInGroup(p)"
                          class="is-size-4 has-text-right avatar">{{ showAvatar(p.id) }}</span>
                  </td>
                  <td>
                    <input :value="p.value"
                           @input="setValue(p, $event.target.value)"
                           ref="input"
                           class="input has-text-weight-medium"
                           type="text"
                           inputmode="tel"
                           :placeholder="$t('sum')">
                    <strong v-if="isPlusSign(p)" class="is-size-6">= {{p.sum}}</strong>
                  </td>
                  <td class="has-text-right">
                    <span @click="remove(p)" class="is-size-7 has-text-right avatar">❌</span>
                  </td>
                </tr>
                <tr>
                  <td colspan="4" class="has-text-right">
                    <label class="checkbox has-text-weight-medium is-size-6">
                      <input type="checkbox" v-model="showNameColumn"> {{ $t('show_names') }}
                    </label>
                  </td>
                </tr>
              </table>
              <div class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <button v-if="canAdd" @click="add()" class="button is-info has-text-weight-semibold">
                      {{ $t('add') }}
                    </button>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <button v-if="canCalculate" @click="calculate()"
                            class="button is-success has-text-weight-semibold">
                      {{ $t('calculate') }}
                    </button>
                  </div>
                </div>
              </div>
              <article v-if="transfers.length > 0" class="message is-warning is-medium">
                <div class="message-header">
                  <p>{{ $t('split_spending_equally') }}</p>
                </div>
                <div class="message-body has-text-dark">
                  <p v-for="transfer in transfers" :key="transfer.id">
                    <strong>{{showParticipant(transfer.from)}}</strong> {{ $t('transfer') }}
                    <strong>{{transfer.pay}}</strong> {{ $t('to') }}
                    <strong>{{showParticipant(transfer.to)}}</strong>
                  </p>
                </div>
              </article>
              <article v-if="transfers.length === 0 && complete" class="message is-success is-medium">
                <div class="message-header">
                  <p>{{ $t('all_spent_equally') }}</p>
                </div>
                <div class="message-body has-text-centered">👌</div>
              </article>
              <article v-if="complete" class="message is-info is-medium">
                <div class="message-header">
                  <p>{{ $t('info') }}</p>
                </div>
                <div class="message-body has-text-dark">
                  <p>{{ $t('total_participants') }} <strong>{{allParticipants}}</strong>
                  <p>{{ $t('total_sum') }} <strong>{{sum}}</strong><p>
                  <p>{{ $t('from_each') }} <strong>{{share}}</strong></p>
                </div>
              </article>
              <article class="message is-dark is-medium">
                <div class="message-header">
                  <p>{{ $t('do_you_know.title') }}</p>
                </div>
                <div class="message-body has-text-dark content">
                  <p v-html="$t('do_you_know.first')"></p>
                  <p v-html="$t('do_you_know.second')"></p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<i18n>
  {
    "en": {
      "title": "How to split the check equally",
      "header": "Input the spending of each participant",
      "show_names": "show names",
      "name": "Name",
      "sum": "Sum",
      "add": "Add",
      "calculate": "Calculate",
      "split_spending_equally": "Split spending equally",
      "transfer": "transfer",
      "to": "to",
      "all_spent_equally": "All spent equally, nothing to translate!",
      "info": "For information",
      "total_participants": "Total participants",
      "total_sum": "Total sum",
      "from_each": "From each",
      "do_you_know": {
        "title": "Did you know?",
        "first": "By clicking on the avatar, you can create a group of up to three members. For example, <strong>hog 🐗</strong> spends money alone, and <strong>foxes 🦊🦊</strong> spend money as a couple, but only one of them pays for everything. Therefore, there are three participants in total, and only two are involved in transfers.",
        "second": "In the input fields you can use the <strong>+</strong> symbol to add more expenses."
      }
    },
    "ru": {
      "title": "Как разделить счет поровну",
      "header": "Укажите траты каждого участника",
      "show_names": "показать имена",
      "name": "Имя",
      "sum": "Сумма",
      "add": "Добавить",
      "calculate": "Рассчитать",
      "split_spending_equally": "Делим траты поровну",
      "transfer": "переводит",
      "to": "для",
      "all_spent_equally": "Все потратили поровну, ничего переводить не надо!",
      "info": "Для информации",
      "total_participants": "Всего участников",
      "total_sum": "Общая сумма",
      "from_each": "С каждого по",
      "do_you_know": {
        "title": "Знаете ли вы?",
        "first": "Кликнув на аватарку, можно создать группу до трёх участников. Например, <strong>кабанчик 🐗</strong> тратит деньги в одиночку, а <strong>лисички 🦊🦊</strong> — парой, но платит за всё Лис. Поэтому всего участников трое, а в переводах участвуют только двое.",
        "second": "В полях ввода можно использовать символ <strong>+</strong> для сложения трат."
      }
    }
  }
</i18n>

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
        sequence: 1,
        locale: 'en'
      }
    },

    computed: {
      canAdd: function() {
        return this.avatars.length > 0
      },

      canCalculate: function() {
        return this.participants.length > 1 && this.participants.every(p => p.sum === 0 || p.sum > 0)
      },

      allParticipants: function() {
        return this.participants.reduce((acc, cur) => acc + cur.count, 0)
      }
    },

    created: function() {
      if (
        this.$router.currentRoute.path !== '/en'
        && this.$router.currentRoute.path !== '/ru'
      ) {
        if (navigator.language.slice(0, 2).toLowerCase() === 'ru') {
          this.$router.push('ru')
        } else {
          this.$router.push('en')
        }
      }

      if (this.$router.currentRoute.path === '/ru') {
        this.setLocale('ru')
      } else {
        this.setLocale('en')
      }

      this.addOneParticipant()
      this.addOneParticipant()
      this.$nextTick(() => this.$refs.input[0].focus())
    },

    watch: {
      $route(to) {
        if (to.path === '/ru') {
          this.setLocale('ru')
        } else {
          this.setLocale('en')
        }
      }
    },

    methods: {
      addOneParticipant: function() {
        if (this.avatars.length > 0) {
          const index = Math.floor(Math.random() * this.avatars.length)
          this.participants.push({
            id: this.sequence++,
            avatar: this.avatars[index],
            name: '',
            sum: null,
            value: '',
            count: 1
          })
          this.avatars.splice(index, 1)
        }
      },

      add: function() {
        this.clearTransfers()
        this.addOneParticipant()
        this.$nextTick(() => this.$refs.input[this.participants.length-1].focus())
      },

      addRemoveOneInGroup: function(p) {
        this.clearTransfers()
        if (this.previousAction === 'add') {
          if (p.count < 3) {
            p.count++
          } else {
            p.count--
            this.previousAction = 'remove';
          }
        } else {
          if (p.count > 1) {
            p.count--
          } else {
            p.count++
            this.previousAction = 'add'
          }
        }
      },

      remove: function(participant) {
        this.clearTransfers()
        this.avatars.push(participant.avatar)
        this.participants = this.participants.filter(p => p.id !== participant.id)
      },

      clearTransfers: function() {
        this.transfers = []
        this.complete = false
      },

      calculate: function() {
        const result = transfers(this.participants)
        this.sum = result.sum
        this.share = result.share
        this.transfers = result.transfers
        this.complete = true
      },

      showAvatar: function(id) {
        const p = this.participants.find(p => p.id === id)
        let result = p.avatar
        for (let i = 1; i < p.count; i++) {
          result = result + p.avatar
        }
        return result
      },

      isPlusSign: function(p) {
        if (p.value && p.value.indexOf('+') > -1) {
          return true
        } else {
          return false
        }
      },

      setValue: function(p, value) {
        this.clearTransfers()
        if (value.match(/^[0-9\\+]*$/)) {
          const terms = value.split('+').map(v => Number(v) || 0)
          p.sum = terms.reduce((acc, cur) => acc + cur, 0)
          p.value = value
        }
      },

      showParticipant: function(id) {
        const p = this.participants.find(p => p.id === id)
        let result = (p.name ? (p.name + ' ') : '') + p.avatar
        for (let i = 1; i < p.count; i++) {
          result = result + p.avatar
        }
        return result
      },

      setLocale: function(locale) {
        this.locale = locale
        this.$i18n.locale = locale
        document.title = this.$t('title')
      }
    }
  }
</script>
