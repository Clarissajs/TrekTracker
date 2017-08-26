import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { GridList, GridTile } from 'material-ui/GridList'
import time from '../helpers/time.js'
//import '../styles.css';

const Posts = (props) => (
  <div>
    <div className="mdc-grid-list mdc-grid-list--twoline-caption mdc-grid-list--tile-gutter-2">
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
  </div>
);

export default Posts;
