import React, { Component } from 'react';
// import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import './App.css';
const text = {
  'textAlign': 'center'
};
const width = {
  'width': '8%',
  'min-width': '65px'
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [[], []],
      user: null,
      count: 0
    };
    this.state.filterText = "";
    this.state.user = [
      {
        id: 1,
        category: 'Sporting Goods',
        price: '49.99',
        qty: 12,
        name: 'football'
      }
    ];
  }
  componentDidMount() {
    fetch("http://127.0.0.1:8080/user", {
      mode: 'cors',
      method: 'get',
      cache: "no-cache",
      credentials: "same-origin",
      withCredentials: true,
      crossdomain: true,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()).then(
      (result) => {
        this.setState({
          data: result,
          count: result.length
        });
      });
  }
  fclear = () => {
    document.getElementById('f_id').value = ""
    document.getElementById('f_fname').value = ""
    document.getElementById('f_lname').value = ""
    document.getElementById('f_email').value = ""
    document.getElementById('f_gender').value = ""
    document.getElementById('f_age').value = ""
  }
  delete = ev => {
    var id = ev.currentTarget.id
    const data = new FormData()
    data.set('id', id);
    console.log(id)
    fetch("http://127.0.0.1:8080/user", {
      mode: 'cors',
      method: 'DELETE',
      cache: "no-cache",
      credentials: "same-origin",
      withCredentials: true,
      crossdomain: true,
      body: data,
      // body: JSON.stringify({ id: id })
    }).then(res => res.json()).then(
      (result) => {
        this.setState({
          data: result,
          count: result.length
        });
        this.fclear()
      },
      (error) => {
        console.log(error)
      });

  }
  close = () => {
    document.getElementById('id01').style.display = 'none'
    console.log("Hide");
  }
  show = ev => {
    document.getElementById('id01').style.display = 'block'
    console.log("show");
  }
  setval = (ev) => {
    var id = ev.currentTarget.id
    const data = new FormData()
    data.set('id', id);
    fetch("http://127.0.0.1:8080/id", {
      mode: 'cors',
      method: 'POST',
      cache: "no-cache",
      credentials: "same-origin",
      withCredentials: true,
      crossdomain: true,
      body: data,
    }).then(res => res.json()).then(
      (result) => {
        document.getElementById('e_id').value = result[0][0]
        document.getElementById('e_fname').value = result[0][1]
        document.getElementById('e_lname').value = result[0][2]
        document.getElementById('e_email').value = result[0][3]
        document.getElementById('e_gender').value = result[0][4]
        document.getElementById('e_age').value = result[0][5]
        console.log(result[0][0])
      },
      (error) => {
        console.log(error)
      });
  }
  save = () => {
    const data = new FormData()
    data.set('id', document.getElementById('e_id').value);
    data.set('fname', document.getElementById('e_fname').value);
    data.set('lname', document.getElementById('e_lname').value);
    data.set('email', document.getElementById('e_email').value);
    data.set('gender', document.getElementById('e_gender').value);
    data.set('age', document.getElementById('e_age').value);
    console.log(data)
    fetch("http://127.0.0.1:8080/user", {
      mode: 'cors',
      method: 'PUT',
      cache: "no-cache",
      credentials: "same-origin",
      withCredentials: true,
      crossdomain: true,
      body: data,
    }).then(res => res.json()).then(
      (result) => {
        this.setState({
          data: result,
          count:result.length
        });
        this.close();
        this.fclear()
      },
      (error) => {
        console.log(error)
      });
  }
  fliter = (ev) => {
    var id = document.getElementById('f_id').value
    var fname = document.getElementById('f_fname').value
    var lname = document.getElementById('f_lname').value
    var email = document.getElementById('f_email').value
    var gender = document.getElementById('f_gender').value
    var age = document.getElementById('f_age').value
    var datafliter = [[]];
    fetch("http://127.0.0.1:8080/user", {
      mode: 'cors',
      method: 'get',
      cache: "no-cache",
      credentials: "same-origin",
      withCredentials: true,
      crossdomain: true,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()).then(
      (result) => {
        datafliter = result
        // this.setState({
        //   data: result
        // });
        var count = datafliter.length;
        var state = 0;
        if (id !== "") {
          var buff = datafliter;
          datafliter = [];
          for (var i = 0; i < count; i++) {
            if (id == buff[i][0]) {
              // console.log("ID:" + buff[i][0])
              datafliter.push(buff[i])
              state = 1;
              count = 1;
              break;
            }
          }
          if (state === 0) {
            datafliter = []
            count = 0
          }
          console.log("ID:")
          console.log(datafliter)
        }
        if (fname !== "") {
          buff = datafliter;
          datafliter = [];
          var num = 0
          for (i = 0; i < count; i++) {
            if (buff[i][1].search("" + fname) >= 0) {
              datafliter.push(buff[i])
              num++
            }
          }
          count = num
          console.log("Fname:")
          console.log(datafliter)
        }
        if (lname !== "") {
          buff = datafliter;
          datafliter = [];
          num = 0
          for (i = 0; i < count; i++) {
            if (buff[i][2].search("" + lname) >= 0) {
              datafliter.push(buff[i])
              num++
            }
          }
          if (num == 0)
            datafliter = [];
          count = num
          console.log("Lname:")
          console.log(datafliter)
        }
        if (email !== "") {
          buff = datafliter;
          datafliter = [];
          num = 0
          for (i = 0; i < count; i++) {
            if (buff[i][3].search("" + email) >= 0) {
              datafliter.push(buff[i])
              num++
            }
          }
          count = num
          console.log("Email:")
          console.log(datafliter)
        }
        if (gender !== "") {
          buff = datafliter;
          datafliter = [];
          num = 0
          for (i = 0; i < count; i++) {
            if (buff[i][4] == gender) {
              datafliter.push(buff[i])
              num++
            }
          }
          count = num
          console.log("Gender:")
          console.log(datafliter)
        }
        if (age !== "") {
          var text = age.split('-');
          if (text.length == 1) {
            text[1] = text[0]
          }
          if (text.length > 1) {
            if (text[1] === "")
              text[1] = text[0]
            if (parseInt(text[1], 10) < parseInt(text[0], 10)) {
              var o = text[1]
              text[1] = text[0]
              text[0] = o
            }
          }
          var Age = [];
          Age[0] = parseInt(text[0], 10)
          Age[1] = parseInt(text[1], 10)
          buff = datafliter;
          datafliter = [];
          num = 0
          for (i = 0; i < count; i++) {
            if (buff[i][5] >= Age[0] && buff[i][5] <= Age[1]) {
              datafliter.push(buff[i])
              num++
            }
          }
          count = num
        }
        this.setState({
          data: datafliter,
          count: parseInt(count, 10)
        });
        console.log("Age:")
        console.log(datafliter)
      });


    // console.log("" + id + fname + lname + email + gender + age)
  }
  create = () => {
    const data = new FormData()
    data.set('fname', document.getElementById('f_fname').value);
    data.set('lname', document.getElementById('f_lname').value);
    data.set('email', document.getElementById('f_email').value);
    data.set('gender', document.getElementById('f_gender').value);
    data.set('age', document.getElementById('f_age').value);
    console.log(data)
    fetch("http://127.0.0.1:8080/user", {
      mode: 'cors',
      method: 'POST',
      cache: "no-cache",
      credentials: "same-origin",
      withCredentials: true,
      crossdomain: true,
      body: data,
    }).then(res => res.json()).then(
      (result) => {
        this.setState({
          data: result,
          count: result.length
        });
        this.fclear()
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
      },
      (error) => {
        console.log(error)
      });
  }
  test = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  render() {
    const users = []
    for (var i = 0; i < this.state.count; i++) {
      users.push(<tr key={i}>
        <th className="text-center">{this.state.data[i][0]}</th>
        <th>{this.state.data[i][1]}</th>
        <th>{this.state.data[i][2]}</th>
        <th>{this.state.data[i][3]}</th>
        <th>{this.state.data[i][4]}</th>
        <th className="text-center">{this.state.data[i][5]}</th>
        <th id={this.state.data[i][0]} onClick={(event) => { this.show(event); this.setval(event); }}  ><button className="w3-block w3-button w3-small w3-padding-small w3-green w3-round-xxlarge" style={text}>Edit</button></th>
        <th id={this.state.data[i][0]} onClick={this.delete}><button className="w3-block w3-button w3-small w3-padding-small w3-red w3-round-xxlarge" style={text}>Remove</button></th>
      </tr>)
    }
    return (
      <div className="">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <table className="w3-table-all" >
              <thead>
                <tr className="w3-red">
                  <th style={width}>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th style={width}>Age</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tr>
                <th><input onChange={this.fliter} id="f_id" className="w3-input" type="text" /></th>
                <th><input onChange={this.fliter} id="f_fname" className="w3-input" type="text" /></th>
                <th><input onChange={this.fliter} id="f_lname" className="w3-input" type="text" /></th>
                <th><input onChange={this.fliter} id="f_email" className="w3-input" type="text" /></th>
                <th><input onChange={this.fliter} id="f_gender" className="w3-input" type="text" /></th>
                <th><input onChange={this.fliter} id="f_age" className="w3-input" type="text" /></th>
                <th colspan="2" onClick={this.create}><button className="w3-block w3-button w3-blue w3-round-xxlarge">Create</button></th>
              </tr>
              {users}
            </table>
          </div>
        </div>

        <div className="row">
          <div id="id01" class="w3-modal w3-animate-opacity">
            <div class="w3-modal-content w3-card-4">
              <header class="w3-container">
                <button type="button" class="close" onClick={this.close}>&times;</button>
              </header>
              <div class="w3-container ">
                <table className="w3-table-all">
                  <thead>
                    <tr className="w3-light-blue">
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tr>
                    <th><input id="e_id" disabled className="w3-input " type="text" /></th>
                    <th><input id="e_fname" className="w3-input" type="text" /></th>
                    <th><input id="e_lname" className="w3-input" type="text" /></th>
                    <th><input id="e_email" className="w3-input" type="text" /></th>
                    <th><input id="e_gender" className="w3-input" type="text" /></th>
                    <th><input id="e_age" className="w3-input" type="text" /></th>
                  </tr>
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" onClick={this.close} class="btn btn-danger">Close</button>
                <button type="button" onClick={this.save} class="btn btn-success">Save</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ float: "left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    );
  }
}
export default App;