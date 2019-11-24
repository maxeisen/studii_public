// import React from "react";
// import ThumbUpIcon from "../assets/Icons/thumbsup.svg";
// import CommentIcon from "../assets/Icons/comment.svg";
// import { Link } from "react-router-dom";
// import { css } from "@emotion/core";

// const IndividualComment = ({
//     author,
//     date,
//     score,
//     content,
//     bestComment,
//   }) => ({
//         if (bestComment) 
//         {
//             return <h1>test</h1>;
//         }
//   )
//             return <div
//             class="bestComment"
//             key={title}
//             >
//         <span
//             align="right"
//             css={css`font-size: 10px; color: #484848; line-height: 20px`}
//         >
//             {date}
//         </span>
//             <h1><b>{author}</b> to <b>{postData.author}</b></h1>
//             <p css={css`font-size: 14px; color: #000000; line-height: 20px;`}>
//             {content}
//             </p>
//             <div class="flex-container">
//         <button
//             className={liked ? "liked" : ""}
//             onClick={()=>setLiked(!liked)}
//             css={css`
//             fontsize: 14px;
//             color: #757575;
//             line-height: 20px;
//             background-color: white;
//             border-radius: 4px;
//             padding: 0.2rem 0.5rem;
//             ${liked ? "border: 2px solid #555" : "border: 2px solid #eee;"}
//             `}
//         >
//             <img src={ThumbUpIcon} width="20px" />{" "}
//             <b>
//             <sup>{liked ? score + 1 : score}</sup>
//             </b>
//         </button>
//         <div
//             css={css`
//             position: relative;
//             padding-left: 5%;
//             font-size: 14px;
//             color: #757575;
//             line-height: 20px;
//             `}
//         >
//             <img
//             src={CommentIcon}
//             width="20px"
//             css={css`
//                 position: absolute;
//                 top: 15%;
//                 right: 25%;
//             `}
//             />{" "}
//             <b>
//             <sup>{numComments}</sup>
//             </b>
//         </div>
//         </div>
//         </div>
//         }
//         return <div
//         key={title}
//         css={css`
//             padding: 20px 20px 0px 20px;
//             border: 2px solid lightgray;
//             border-radius: 5px;
//             margin: 20px 20px 20px 20px;
//         `}
//         >
//         <span
//         align="right"
//         css={css`font-size: 10px; color: #484848; line-height: 20px`}
//         >
//         {date}
//         </span>
//         <h1><b>{author}</b> to <b>{postData.author}</b></h1>
//         <p css={css`font-size: 14px; color: #000000; line-height: 20px;`}>
//             {content}
//         </p>
//         <div class="flex-container">
//         <button
//             className={commentLiked ? "commentLiked" : ""}
//             onClick={()=>setCommentLiked(!commentLiked)}
//             css={css`
//             fontsize: 14px;
//             color: #757575;
//             line-height: 20px;
//             background-color: white;
//             border-radius: 4px;
//             padding: 0.2rem 0.5rem;
//             ${commentLiked ? "border: 2px solid #555" : "border: 2px solid #eee;"}
//             `}
//         >
//             <img src={ThumbUpIcon} width="20px" />{" "}
//             <b>
//             <sup>{commentLiked ? score + 1 : score}</sup>
//             </b>
//         </button>
//         <div
//             css={css`
//             position: relative;
//             padding-left: 5%;
//             font-size: 14px;
//             color: #757575;
//             line-height: 20px;
//             `}
//         >
//             <img
//             src={CommentIcon}
//             width="20px"
//             css={css`
//                 position: absolute;
//                 top: 15%;
//                 right: 25%;
//             `}
//             />{" "}
//             <b>
//             <sup>{numComments}</sup>
//             </b>
//         </div>
//         </div>
//         </div>
//         }
//         )}
//     </div>
//   );

// export default IndividualComment;