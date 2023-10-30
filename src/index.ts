class FetchReq {
  readonly url: string

  constructor(url: string = 'http://37.220.80.108/tasks') {
    this.url = url
  }

  private fetchReq(
    method: string,
    id: number | null = null,
    body: object | null = null,
    headers = { 'Content-Type': 'application/json' }
  ): void {
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

  getAllTasks(): void {
    this.fetchReq('GET')
  }

  getOneTask(id: number): void {
    this.fetchReq('GET', id)
  }

  postOneTask(body: object): void {
    this.fetchReq('POST', null, body)
  }

  deleteOneTask(id: number): void {
    this.fetchReq('DELETE', id)
  }

  patchOneTask(id: number, body: object): void {
    this.fetchReq('PATCH', id, body)
  }
}

interface IBogy {
  name?: string
  info?: string
  isImportant?: boolean
  isCompleted?: boolean
}

const body: IBogy = {
  name: 'some name',
  info: 'Initial object',
  isImportant: true,
  isCompleted: false,
}

const patchedBody: IBogy = {
  info: 'Patched object',
}

//Пример использования
const fetchVar = new FetchReq()
fetchVar.getAllTasks()
fetchVar.getOneTask(1)
fetchVar.postOneTask(body)
fetchVar.patchOneTask(1, patchedBody)
fetchVar.deleteOneTask(1)
