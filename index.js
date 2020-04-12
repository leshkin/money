const AVATARS = [
  '😼',
  '🐶',
  '🐮',
  '🐺',
  '🦊',
  '🐷',
  '🐼',
  '🐻',
  '🐗',
  '🦉',
  '🐸',
  '🦀',
  '🍄',
  '🐛',
  '🐟',
  '🦔',
  '🦁'
]

var app = new Vue({
  el: '#app',
  data: {
    persons: [],
    transfers: [],
    luckyOnes: [],
    showNoTransfers: false
  },
  computed: {
    canAdd: function() {
      return this.persons.length < AVATARS.length;
    },
    canCalc: function() {
      return this.persons.length > 1 && this.persons.every(p => p.sum > 0);
    }
  },
  created: function() {
    this.shuffle(AVATARS);
    this.persons.push({avatar: AVATARS[0], sum: null});
    this.persons.push({avatar: AVATARS[1], sum: null});
    this.$nextTick(() => this.$refs.input[0].focus());
  },
  methods: {
    add: function() {
      this.clearTransfers();
      if (this.canAdd) {
        this.persons.push({avatar: AVATARS[this.persons.length], sum: null}); 
      }
      this.$nextTick(() => this.$refs.input[this.persons.length-1].focus());
    },

    remove: function(person) {
      this.clearTransfers();
      this.persons = this.persons.filter(p => p.avatar !== person.avatar);
    },

    clearTransfers: function() {
      this.transfers = [];
      this.luckyOnes = [];
      this.showNoTransfers = false;
    },
    
    calc: function() {
      let animals = JSON.parse(JSON.stringify(this.persons));
      let sum = animals.reduce((accumulator, current) => accumulator + current.sum, 0);
      const remainderForAll = sum % animals.length;
      let p = 0;
      while (remainderForAll > 0 && p < animals.length - remainderForAll) {
        animals[p].sum += 1;
        this.luckyOnes.push({...animals[p]});
        p++;
      }
      sum = animals.reduce((accumulator, current) => accumulator + current.sum, 0);
      const average = sum / animals.length;
      let lessThanAverage = [];
      let greaterThanAverage = [];
      for (const v of animals) {
        const newValue = { avatar: v.avatar, pay: average - v.sum };
        if (newValue.pay > 0) {
          lessThanAverage.push(newValue);
        } else {
          greaterThanAverage.push(newValue);
        }
      }
      lessThanAverage = lessThanAverage.sort((a, b) => b.pay - a.pay);
      greaterThanAverage = greaterThanAverage.sort((a, b) => a.pay - b.pay);
      let i = 0;
      let j = 0;
      while (i < lessThanAverage.length && j < greaterThanAverage.length) {
        let remainder = lessThanAverage[i].pay + greaterThanAverage[j].pay;
        let lessName = lessThanAverage[i].avatar;
        let greaterName = greaterThanAverage[j].avatar;
        let passedMoney;
        if (remainder > 0) {
          passedMoney = lessThanAverage[i].pay - remainder;
          lessThanAverage[i].pay = remainder;
          j++;
        } else if (remainder < 0) {
          passedMoney = lessThanAverage[i].pay;
          greaterThanAverage[j].pay = remainder;
          i++;
        } else if (remainder === 0) {
          passedMoney = lessThanAverage[i].pay;
          i++;
          j++;
        }
        this.transfers.push({from: lessName, to: greaterName, pay: passedMoney});
      }
      for (r of this.transfers) {
        for (v of animals) {
          if (r.from === v.avatar) {
            v.sum = v.sum + r.pay;
          }
          if (r.to === v.avatar) {
            v.sum = v.sum - r.pay;
          }
        }
      }
      if (this.transfers.length === 0) {
        this.showNoTransfers = true;
      }
    },

    shuffle: function(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
})