	storage = {
		fetch: function (key) {
			return JSON.parse(localStorage.getItem(key) || 0);
		},
		save: function (key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	};



new Vue({
  el: '#app',
  data: {
    maxHP: storage.fetch("maxHP"),
    currentHP: storage.fetch("currentHP"),
    currentHeal: "",
    currentHit: "",
    log: [],
  },
  computed: {
    HPbarWidth: function () {
      return (100/this.maxHP * this.currentHP);
    }
  },
  watch: {
		maxHP: {
			handler: function (maxHP) {
			  storage.save("maxHP", maxHP);
			},
				deep: true
		},
		currentHP: {
			handler: function (currentHP) {
			  storage.save("currentHP", currentHP);
			},
				deep: true
		}
	},
  methods: {
    getRandomInt: function(max) {
      var min = 1;
      return Math.floor(Math.random() * (max - min)) + min;
    },
    drinkPotion: function () {
      var potion = this.getRandomInt(8) +1;
      this.currentHP = this.currentHP + potion;
      
      if(this.currentHP > this.maxHP){
        this.currentHP = this.maxHP;
      }
    },
    heal: function (healHP) {
      if(healHP){ 
        console.log( this.currentHP)
        this.currentHP = parseInt(this.currentHP) + parseInt(healHP);
        
        if(this.currentHP > this.maxHP){
          this.currentHP = this.maxHP;
        }
        this.currentHeal= ""; 
      }
    },
    hit: function (hitHP) {
      if(hitHP){ 
        this.currentHP = parseInt(this.currentHP) - parseInt(hitHP);
      
        if(this.currentHP < 0){
          this.currentHP = 0;
        }
        this.currentHit= "";  
      }
    }
  },
  config:{
    debug: true
  }
})

