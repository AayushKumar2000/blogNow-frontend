import React from 'react';
import userPic from './img/pic.jpg';



const SavedDraft = ()=>{

    const storageLength  = localStorage.length;
    let draftArray=[];
    const userName = JSON.parse(localStorage.getItem('user')).name

    for( var index=0;index<storageLength;index++){
        const key  = localStorage.key(index);
        if(!key.match(/blog-draft-/))
          continue;

         const item = JSON.parse(localStorage.getItem(key))
         const date = new Date(item.date).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"}) 
         draftArray.push({key,title:item.title,date});
    }

    console.log(draftArray)

    return <div className="flex flex-col h-screen w-screen bg-gray-50">
    <div className="flex items-center  pl-5 h-16 bg-purple-600 w-full text-white">
      <div> BlogNow</div>
      <div className="ml-auto pr-10 flex items-center">
      <img alt="user_avatar" src={userPic} className="w-9 rounded-full "/>
      <div className="font-normal pl-2 text-base">{userName}</div>
      </div>
    </div>
    <div>
        <div>Saved Draft</div>
        <div className="mx-40 my-10">
        <div className="flex justify-between  border-b-2 py-5 px-3 text-lg font-medium text-gray-300">
            <div>Title</div>
            <div className="flex w-60 justify-between"> 
                <div className="">Last Edited</div>
                <div className="">Published</div>
            </div>
        </div>
         {
            draftArray.map((item)=>{
                console.log(item.date)
                return <div  key={item.key} className="flex justify-between px-3 py-3 border-b-2 font-Cambria">
                          <a href={`editor/write/${item.key}`}>{item.title}</a>
                          <div className="flex w-60 justify-between">
                            <div className="">{item.date}</div>
                            <div className="">None</div>
                          </div>
                       </div>
            })
         }
        </div>
    </div>
    </div>
    
    
}

export default SavedDraft;