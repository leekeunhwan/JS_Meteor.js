import { Template } from "meteor/templating";
import { Notes } from "../lib/collections.js";
import { Accounts } from "meteor/accounts-base";

// 계정 구성
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

import "./main.html";

Template.body.helpers({
  // notes: [{ text: "My Note 1" }, { text: "My Note 2" }, { text: "My Note 3" }]
  notes() {
    return Notes.find({});
  }
});

Template.add.events({
  "submit .add-form": function() {
    event.preventDefault(); // 이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소합니다. (다른 파일로 전송되는 것을 막기위해 설정)

    // 값을 입력 받도록 변수 설정
    const target = event.target;
    const text = target.text.value;

    // 노트를 리스트로 삽입ㄹ
    /*
    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
    */
    Meteor.call("notes.insert", text);

    // 입력후 폼을 다시 원상태로
    target.text.value = "";

    // 모달 닫기
    $("#addModal").modal("close");

    return false;
  }
});

Template.note.events({
  "click .delete-note": function() {
    //Notes.remove(this._id);
    Meteor.call("notes.remove", this);
    return false;
  }
});
