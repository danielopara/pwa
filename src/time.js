const date = new Date()

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hrs = date.getHours()
  const mins = date.getMinutes()
  const secs = date.getSeconds()

  export const time =  year + "/" + month + "/" + day + " " + hrs + ":" + mins + ":" + secs 