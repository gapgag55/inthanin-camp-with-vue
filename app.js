
var vm = new Vue({
  el: '#inthanin',
  data: {
    popup: false,
    message: 'สมัครเรียบร้อย'
  },
  methods: {
    addStudent () {
      var data = {
        fullname: this.fullname,
        nickname: this.nickname,
        class: this.class,
        phone: this.phone,
        school: this.school,
        university: this.university,
        ask: this.ask,
        rule: this.rule,
        sentence: this.sentence,
        wanttodo: this.wanttodo,
        why: this.why,
        nameParent: this.nameParent,
        phoneParent: this.phoneParent,
        pass: false
      }

      this.$http.post('/students', data).then(function( response ) {
        console.log( response )
        if ( !response.data.okay ) {
           this.message = "สมัครเข้าร่วมไม่สำเร็จ"
        } 
        this.popup = true;
      }.bind(this))
    }
  }
});