'use strict'
class FetchReq {
  constructor(url = 'http://37.220.80.108/tasks') {
    this.url = url
  }
  fetchReq(
    method,
    id = null,
    body = null,
    headers = { 'Content-Type': 'application/json' }
  ) {
    fetch(id ? `${this.url}/${id}` : this.url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : null,
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => console.log(data))
        } else {
          console.log(`Ошибка ${response.status}: ${response.statusText}`)
        }
      })
      .catch((e) => console.log(e))
  }
  getAllTasks() {
    this.fetchReq('GET')
  }
  getOneTask(id) {
    this.fetchReq('GET', id)
  }
  postOneTask(body) {
    this.fetchReq('POST', null, body)
  }
  deleteOneTask(id) {
    this.fetchReq('DELETE', id)
  }
  patchOneTask(id, body) {
    this.fetchReq('PATCH', id, body)
  }
}
const body = {
  name: 'some name',
  info: 'Initial object',
  isImportant: true,
  isCompleted: false,
}
const patchedBody = {
  info: 'Patched object',
}
const fetchVar = new FetchReq()

//Примеры использования
fetchVar.getAllTasks()
// fetchVar.getOneTask(1);
// fetchVar.postOneTask(body);
// fetchVar.patchOneTask(1, patchedBody);
// fetchVar.deleteOneTask(1);
