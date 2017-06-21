
var vm = new Vue({
  el: '#inthanin',
  data: {
    popup: false
  },
  methods: {
    addStudent () {
      var data = {
        fullname: this.fullname,
        nickname: this.nickname,
        class: this.class,
        school: this.school,
        university: this.university,
        ask: this.ask,
        rule: this.rule,
        sentence: this.sentence,
        wanttodo: this.wanttodo,
        why: this.why,
      }

      this.$http.post('/students', data).then(function( response ) {
        console.log( response );
      })

      this.popup = true;
    }
  }
});