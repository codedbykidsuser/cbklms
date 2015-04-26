Students = new Mongo.Collection('students');

Students.allow({
  update: function(userId, student) {
    return !! userId
  },
  remove: function(userId, student) {
    return !! userId
  }
});

Meteor.methods({
  studentInsert: function(studentAttributes) {
    check(Meteor.userId(), String);

    var studentWithSameDob = Students.findOne({dob: studentAttributes.dob});
    var studentWithSameFirstName = Students.findOne({first_name: studentAttributes.first_name});

    if (studentWithSameDob && studentWithSameFirstName) {
      return {
        studentExists: true,
        _id: studentWithSameDob._id
      }
    }

    var user = Meteor.user();
    var student = _.extend(studentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var studentId = Students.insert(student);
    return {
      _id: studentId
    };
  }
});