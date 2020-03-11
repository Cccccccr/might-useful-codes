"use strict"

function getEmpty(o){
    // console.log(Object.prototype.toString.call(o).slice(8, -1));
    if(Object.prototype.toString.call(o).slice(8, -1) === "Object"){
        return {};
    }
    if(Object.prototype.toString.call(o).slice(8, -1) === "Array"){
        return [];
    }
    return o;
}

function deepCopyDFS(origin){
    let strack = [];
    let map = new Map();
    
    let target = getEmpty(origin);
    if(target !== origin){
        strack.push([origin, target]);
        map.set(origin, target);
    }

    while(strack.length){
        let [ori, tar] = strack.shift();
        let resArr = [];
        for(let key in ori){
            if(map.get(ori[key])){
                tar[key] = map.get(ori[key]);
                continue;
            }
            
            tar[key] = getEmpty(ori[key]);
            if(tar[key] !== ori[key]){
                resArr.push([ori[key], tar[key]]);
                map.set(ori[key], tar[key]);
            }
        }
        strack = resArr.concat(strack);
        // console.log(strack);
    }
    return target;
}

function deepCopyBFS(origin){
    let strack = [];
    let map = new Map();

    let target = getEmpty(origin);
    if(target !== origin){
        strack.push([origin, target]);
        map.set(origin, target);
    }

    while(strack.length){
        let [ori, tar] = strack.shift();
        for(let key in ori){
            if(map.get(ori[key])){
                tar[key] = map.get(ori[key]);
                continue;
            }

            tar[key] = getEmpty(ori[key]);
            if(tar[key] !== ori[key]){
                strack.push([ori[key], tar[key]]);
                map.set(ori[key], tar[key]);
            }
        }
    }

    return target;
}

[deepCopyBFS, deepCopyDFS].forEach(deepCopy=>{
	console.log(deepCopy({a:1}));
	console.log(deepCopy([1,2,{a:[3,4]}]))
	console.log(deepCopy(function(){return 1;}))
	console.log(deepCopy({
		x:function(){
			return "x";
		},
		val:3,
		arr: [
			1,
			{test:1}
		]
	}))

	let circle = {};
	circle.child = circle;
	console.log(deepCopy(circle));
})