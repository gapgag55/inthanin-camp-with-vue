
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
        school: this.school,
        phone: this.phone,
        facebook: this.facebook,
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

var vm = new Vue({
  el: '#people', 
  data: {
    students: []
  },
  methods: {
    setPass: function(key, pass) {
      this.students.map(student => {
        if( student.key == key ) {
          student.pass = !pass 
        }

        return student
      })

      this.$http.post('/passStudent', {key, pass})
    }
  },
  created() {
    this.$http.get('/students').then(function( data ) {
   
      for(var key in data.data.students) {
        data.data.students[key].key = key;
        this.students.push(data.data.students[key])
      }

    }.bind(this))
  }
})