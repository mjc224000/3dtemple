function a() {
    return new Promise(function (resolve) {
        console.log('开始');
        setTimeout(function () {
            console.log(1);
            resolve(2)
        }, 2000)
    })
}

async function f() {
  let n=  await a();
    console.log(n)
}
f()