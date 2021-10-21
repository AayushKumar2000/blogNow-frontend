import React, { useState, useEffect} from 'react';
import MyEditor from './editor'
import { convertToRaw } from 'draft-js';
import userPic from './img/pic.jpg';



const EditorUi = (props) =>{
  let newTime=null,draftTime=null;
//  useEffect(()=>{
//    draftTime = (localStorage.getItem('lastSaveDraftTime'));
//    newTime = Math.floor((Math.abs(new Date() - new Date(draftTime))/60000));
//  },[])
  

   draftTime = (localStorage.getItem('lastSaveDraftTime'));
   newTime = Math.floor((Math.abs(new Date() - new Date(draftTime))/60000));

 const userName = JSON.parse(localStorage.getItem('user')).name
 const savedDraft =  JSON.parse(localStorage.getItem(props.match.params.draftID))
  
console.log(newTime)
  const [wordCount,setWordCount] = useState(0);
  const [editorState,setEditorState] = useState(null); 
  const [title,setTitle] = useState(savedDraft?savedDraft.title:"");
  //const [draftSavedTime,setDraftSavedTime] = useState(draftTime? newTime: null)
  const [draftSavedTime,setDraftSavedTime] = useState(0)

  // setTimeout(()=>setDraftSavedTime(draftSavedTime+1), 1000*60);


  const editorContent = (state)=>{
    console.log(state)
    setEditorState(state)
    let wordCount=0;

    if(state.blocks[0].text.length===0){
      console.log("delete")
      setWordCount(wordCount)
    }
    
    state.blocks.forEach(({text})=>{
      if(text.length!==0 && text.trim()!=="")
       wordCount+= text.match(/(\w+)/g).length;
    })
    setWordCount(wordCount)
    
    
  }

  const onPublishPress = ()=>{
    
  }


  const saveLocal = () =>{
          const draftName = props.match.params.draftID?props.match.params.draftID.substr(11):Date.now()
          localStorage.setItem(`blog-draft-${draftName}`,(JSON.stringify({ title, editorState, date: new Date()+""})));
          const time = new Date();
          localStorage.setItem('lastSaveDraftTime',new Date()+"")
          setDraftSavedTime(0)
            setTimeout(()=>setDraftSavedTime(draftSavedTime+1), 1000*60);


  }

   
 

  return <div className="flex flex-col h-screen w-screen bg-gray-50">
     <div className="flex items-center  pl-5 h-16 bg-purple-600 w-full text-white">
       <div> BlogNow</div>
       <div className="ml-auto pr-10 flex items-center">
       <img alt="user_avatar" src={userPic} className="w-9 rounded-full "/>
       <div className="font-normal pl-2 text-base">{userName}</div>
       </div>
     </div>
     <div className="bg-gray-200 h-15 ">
        <textarea value={title} onChange={(event)=>setTitle(event.target.value)} placeholder="Write Title here" className="pl-6 placeholder-gray-300 placeholder- text-2xl font-semibold  w-full border-none outline-none border-transparent " id="title" name="title" />
     </div>

     <div className="flex h-full w-full ">
         <div className="h-full w-4/5">{
            props.match.params.draftID &&!savedDraft? <div className="text-xl pl-5 font-bold  font-timeNewRoman">No Saved Draft Found</div>:
              <MyEditor editorContent={editorContent} draftID={props.match.params.draftID}/>
          }
          </div>

         <div  className="flex w-1/5 h-full flex-col p-2 border-4 border-gray-100">
           <button disabled={wordCount===0?'disabled':''} type="button"  onClick={()=>saveLocal()} className="disabled:opacity-50  px-8 py-1 bg-gray-300 inline-block shadow-sm hover:bg-gray-400 rounded-md">Save Draft</button>
           <div className="text-gray-300 mt-1 ml-1">{draftSavedTime?`Last saved ${draftSavedTime} minutes ago`:""}</div>
           <div className="mt-3">
             <div className="flex align-middle">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <div className="ml-2">Visibility:<span className="ml-2 font-semibold">Public</span></div>
             </div>             
             <div className="flex align-middle mt-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
               </svg>
               <div className="ml-2">Last Published:<span className="ml-2 font-semibold">Today</span></div>
             </div>
           </div>
           <div className="mt-auto pl-1">Words: <span>{wordCount}</span></div>
           <button  onClick={()=>onPublishPress()} type="button" disabled={wordCount===0?'disabled':''} className="disabled:opacity-50    mt-2 px-8 py-1 mb-3 bg-green-400 text-white rounded-md shadow-sm hover:bg-green-500">
            Publish</button>
         </div>
     </div>
  </div>
}

export default EditorUi;