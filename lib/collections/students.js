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