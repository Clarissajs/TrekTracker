import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { GridList, GridTile } from 'material-ui/GridList'
import time from '../helpers/time.js'

// Original code
// const Posts = (props) => (
//   <div>
//     {props.posts.map((post, i) => (
//       <div key={i}>
//         <Card className='post'>
//           <CardHeader
//             title={post.poster.firstname + ' ' + post.poster.lastname}
//             subtitle={post.poster.email}
//           />
//           <CardMedia overlay={<CardTitle title={post.text} subtitle={time.parse(post.createdAt, true)} />}>
//             <img src={post['image_url']}/>
//           </CardMedia>
//         </Card>
//       </div>
//     ))}
//   </div>
// );
//
// export default Posts;

const Posts = (props) => (
  <div className="mdc-grid-list mdc-grid-list--twoline-caption">
  <ul className="mdc-grid-list__tiles">
    {props.posts.map((post, i) => (
      <div key={i}>
      <li className="mdc-grid-tile">
        <div className="mdc-grid-tile__primary">
          <img className="mdc-grid-tile__primary-content" src={post['image_url']} />
        </div>
        <span className="mdc-grid-tile__secondary">
          <span className="mdc-grid-tile__title">{post.text}</span>
          <span className="mdc-grid-tile__support-text">-{post.poster.firstname}</span>
        </span>
      </li>
      </div>
    ))}
  </ul>
</div>
);

export default Posts;

// Code that works

// const Posts = (props) => (
//   <div className="mdc-grid-list mdc-grid-list--twoline-caption">
//   <ul className="mdc-grid-list__tiles">
//     {props.posts.map((post, i) => (
//       <div key={i}>
//       <li className="mdc-grid-tile">
//         <div className="mdc-grid-tile__primary">
//           <img className="mdc-grid-tile__primary-content" src={post['image_url']} />
//         </div>
//         <span className="mdc-grid-tile__secondary">
//           <span className="mdc-grid-tile__title">{post.text}</span>
//           <span className="mdc-grid-tile__support-text">-{post.poster.firstname}</span>
//         </span>
//       </li>
//       </div>
//     ))}
//   </ul>
// </div>
// );
//
// export default Posts;
