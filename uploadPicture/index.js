"use strict"

let pictureArr = [];

function uploadAvatar(avatar){
    console.log(avatar.target.files[0])
    let file = avatar.target.files[0]//重点
    arr.push(file);
    console.log(file);
    //往后可用filereader取得base64或者二进制编码
    /*
    let data = new FormData();
    data.append("file", file, file.name);
    */
    //或者转base64
}

//可以在读取文件时将上传按钮设置为不可用，读取完才可以使用
function readAsDataURL(){ 
    //检验是否为图像文件 
    let pictureBox = document.getElementById("pictureBox");
    let files = document.getElementById("file").files;
    let file = document.getElementById("file");
    let insertPoint = document.getElementById('insertPoint');
    let urlArr = [];
    let promiseArr = [];
    Array.from(files).forEach((item, index) => {
        // console.log(item === files[0]);//true
        let p = new Promise((resolve, reject) => {
            var reader = new FileReader(); 
            //将文件以Data URL形式读入页面 
            // reader.readAsDataURL(file); 
            // console.log(reader.readAsDataURL(file));
            // console.log(reader.readAsBinaryString(file));
            // console.log(reader.readAsText(file));
            reader.readAsDataURL(item);
            //这个是异步的
            reader.onload=function(e){
                // console.log(this.result);
                // console.log(this.result === e.target.result);
                let len = pictureArr.length;
                let url = getObjectURL(item);
                pictureArr[len + index] = this.result;
                urlArr[index] = url;
                resolve();
            }
            
        })
        promiseArr.push(p);
    });
    Promise.all(promiseArr).finally(() => {
        urlArr.forEach(item => {
            let ele = document.createElement ('div');
            ele.className = 'picture';
            ele.innerHTML = '<img class="cover" src="'+ item +'"></img>';
            pictureBox.insertBefore(ele, insertPoint);
        });
        // console.log(pictureArr);
        // uploadPicture(pictureArr);
        document.getElementById('file').value = '';
        //即时测试上传
        // uploadPicture(pictureArr);
    })
}

function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url;
}

function dataURltoBlob(dataURL){
    //两种方法都可以
    // console.log(dataURL.split(',')[1]);
    // console.log(dataURL.substring(dataURL.indexOf(',') + 1));
    let byteString = atob(dataURL.substring(dataURL.indexOf(',') + 1));
    //mime解析出来的没有前面的data
    let mimeString = dataURL.split(',')[0].split(';')[0];
    let mime = dataURL.split(',')[0].match(/:(.*?);/)[1];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for(let i= 0; i< byteString.length; i++){
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {
        type: mime
    });
}

function uploadPicture(pictureArr){
    console.log('uploadPicture');
    let fd = new FormData();
    pictureArr.forEach(dataUrl => {
        let blob = dataURltoBlob(dataUrl);
        // console.log(blob);
        let type = blob.type.split('/')[1];
        // console.log(type);
        //需要添加一个生成名字的函数
        fd.append('file', blob, 'img1.' + type);
    });
    console.log(fd.getAll('file'));

    // 这个和jq的ajax有区别的
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){//请求成功
            console.log(Object.prototype.toString.call(xhr.responseText));
            let response = JSON.parse(xhr.responseText);
            let file =  response.file;
            console.log(file);
            console.log(typeof file);
        } else {
            console.log('xhr.status: ' + xhr.status);
        }
    }
    xhr.open('post', 'http://localhost:8000/get', true);
    //这两个不能和jq那样设置为false
    // xhr.setRequestHeader('Content-type', 'false');
    // xhr.setRequestHeader('processData', 'false');
    xhr.setRequestHeader('cache', 'false');
    xhr.send(fd);

    // $.ajax({
    //     type: 'post',
    //     url: 'http://localhost:8000/get',
    //     cache: false,
    //     data: fd,
    //     contentType: false,
    //     processData: false,
    //     success: (res) =>{
    //         console.log(res);
    //     },
    //     error: (err) => {
    //         console.log(err)
    //     }
    // });
}

// console.log(111);

document.getElementById('closeBtn').onclick = () => {
    document.getElementById('uploadPictureBox').style = 'visibility: hidden';
}

document.getElementById('openUpload').onclick = () => {
    document.getElementById('uploadPictureBox').style = '';
}

document.getElementById('uploadBtn').onclick = () => {
    uploadPicture(pictureArr);
};

document.getElementById('cancleBtn').onclick = () => {
    pictureArr = [];
    document.getElementById('uploadPictureBox').style = 'visibility: hidden';
}


