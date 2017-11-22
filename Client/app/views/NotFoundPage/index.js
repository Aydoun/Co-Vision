/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */
import React from 'react';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <article>
      <p>Not Found</p>
      <Link to="/">Back Home</Link>
    </article>
  );
}
