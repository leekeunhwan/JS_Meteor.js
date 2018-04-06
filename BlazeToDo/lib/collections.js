import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Notes = new Mongo.Collection("notes");

Meteor.methods({
  "notes.insert"(text) {
    check(text, String);

    // 만약 유저가 로그인 했는지 확인하고 싶다면
    if (!Meteor.userId()) {
      throw new Meteor.Error("허가받지 않았습니다.");
    }

    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  "notes.remove"(note) {
    check(note._id, String);

    if (note.owner !== Meteor.userId()) {
      throw new Meteor.Error("허가받지 않았습니다.");
    }

    Notes.remove(note._id);
  }
});
