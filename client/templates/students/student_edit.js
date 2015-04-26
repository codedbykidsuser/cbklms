Template.studentEdit.events({
  'submit form': function(e){
    e.preventDefault();

    var currentStudentId = this._id;

    var studentProperties = {
      first_name: $(e.target).find('[name=first_name]').val(),
      last_name: $(e.target).find('[name=last_name]').val(),
      level: $(e.target).find('[name=level]').val(),
      dob: $(e.target).find('[name=dob]').val(),
      reg_packet: $(e.target).find('[name=reg_packet]').val()
    };

    Students.update(currentStudentId, {$set: studentProperties}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('studentPage', {_id: currentStudentId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentStudentId = this._id;
      Students.remove(currentStudentId);
      Router.go('studentList');
    }
  }
});