import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2";
import Editor from '../../component/Editor/Editor'
import "./NoticeWrite.css"
import "react-quill/dist/quill.snow.css"

function NoticeWrite() {
    const navigate = useNavigate();

    const [writer, setWriter] = useState("관리자")  //작성자
    const [title, setTitle] = useState("")  //제목
    const [content, setContent] = useState("")  //내용
    const [files, setFiles] = useState([]); //첨부파일

    //첨부파일 handle 함수
    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    //공지사항 업로드 함수
    const handleUploadNotice = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("writer", writer);  //작성자(관리자)
        formData.append("title", title);  //제목
        formData.append("content", content);  //글 내용
        files.map((file) => (
            formData.append("files", file)  //첨부 파일
        ));

        axios
            .post("/notice/insert", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }})
            .then((response) => {;
                Swal.fire({
                    icon: "success",
                    title: "공지사항이 업로드 되었습니다",
                    showConfirmButton: false,
                    timer: 1500
                })
                //성공 시 공지사항 목록으로 이동
                navigate("/noticeBoard");
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "파티 게시글 업로드가 실패했습니다",
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    };

    //공지사항 취소 함수
    const handleCancelNotice = () => {
        Swal.fire({
            icon: "error",
            title: "공지사항 작성을 취소합니다",
            showConfirmButton: false,
            timer: 1500
        })
        //공지사항 작성 취소 시 공지사항 목록으로 이동
        navigate("/noticeBoard");
    }

    return (
        <div className="container">
            <div className="editor-container">
                <Editor
                    setTitle={setTitle} 
                    setContent={setContent}
                />
                <div className="file-container">
                    <input
                        type="file"
                        id="fileInput"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput" className="upload-button">
                        첨부파일
                    </label>

                    <div className="selected-files">
                        {files.map((file, index) => (
                            <div className="file-name" key={index}>
                                {file.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="button-container">
                    <button
                        className="submit-button"
                        onClick={handleUploadNotice}>
                        작성
                    </button>
                    <button
                        className="cancel-button"
                        onClick={handleCancelNotice}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoticeWrite;