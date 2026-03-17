

import { useState } from 'react';
import './App.css'

function App() {
  let [postTitle, postTitleChange] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [like, likeChange] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [input, inputChange] = useState('');



  return (
    <>
      <div className="App">       
          <div className='black-nav'>
            <h4 style={{color:'#fff', fontSize:'16px'}}>React</h4>
          </div>

          <button onClick={()=>{
            let copy = [...postTitle];
            copy[0] = '여자 코트 추천';
            postTitleChange(copy)
          }}>첫글 바꾸기 버튼</button>
          
          <button onClick={()=>{
            let copy = [...postTitle];
            copy.sort((a, b) => a.localeCompare(b));
            postTitleChange(copy);
          }}>가나다순정렬</button>

        
          {
           postTitle.map(function(item,idx){
              return (
                 <div className='list' key={idx}>
                    <h4 onClick={()=> {
                      setModal(!modal);
                      setTitle(idx);
                    }}>{ postTitle[idx] } 
                      <span onClick={
                        (e)=>{
                          e.stopPropagation(); 
                          let copy = [...like];
                          copy[idx] = copy[idx]+1;
                          likeChange(copy)
                        }
                      }>👍</span> { like[idx] }                       
                    </h4>
                    <p>2월 17일 발행</p>
                    <button onClick={()=>{
                      let copyTitle = [...postTitle];
                      copyTitle.splice(idx, 1);
                      postTitleChange(copyTitle);

                      let copyLike = [...like];
                      copyLike.splice(idx,1);
                      likeChange(copyLike);
                    }}>글삭제</button>
                  </div>
              )
            })
          }

        <input type="text" onChange={(e)=>{
          inputChange(e.target.value);
          console.log(input);
        }}/>
        <button onClick={()=>{
          let copy = [...postTitle];
          copy.unshift(input);
          postTitleChange(copy);
        }}>글추가</button>

        {
          modal == true ? <Modal postTitle={postTitle} postTitleChange={postTitleChange} title={title} /> : null          
        }


      </div>
    </>
  )
}



function Modal(props){
  return(
    <div className='modal' >
      <h4>{props.postTitle[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={
        ()=>{
          let copy = [...props.postTitle];
          copy[0] = "여자코트 추천";
          props.postTitleChange(copy);
        }
      }>글수정</button>
    </div>
  )
}

export default App
