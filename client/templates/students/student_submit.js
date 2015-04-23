Template.studentSubmit.events({
  'submit form': function(e){
    e.preventDefault();

    var student = {
      first_name: $(e.target).find('[name=first_name]').val(),
      last_name: $(e.target).find('[name=last_name]').val(),
      level: $(e.target).find('[name=level]').val(),
      dob: $(e.target).find('[name=dob]').val(),
      reg_packet: $(e.target).find('[name=reg_packet]').val()
    };

    Meteor.call('studentInsert', student, function(error, result) {
      if (error)
        return alert(error.reason);
      Router.go('studentPage', {_id: result._id});
    });
  }
});