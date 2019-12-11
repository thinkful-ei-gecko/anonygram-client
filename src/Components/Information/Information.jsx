import React from 'react';
import './Information.css';
import { HashLink as Link } from 'react-router-hash-link';

const Information = () => {
  return (
    <section className="Information__container">
      <header>
        <h1 className="Information__h1">Information</h1>
      </header>
      <h2 className="Information__h2">Table of Contents</h2>
      <ul className="Information__ul">
        <li><Link smooth to="/info#about">About</Link></li>
        <li><Link smooth to="/info#getting-started">Getting Started</Link></li>
      </ul>
      <h3 id="about" className="Information__h3">About</h3>
      <p className="Information__paragraph">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
        excepturi temporibus quaerat aut eius quibusdam, velit non recusandae
        impedit delectus illum quos ipsam voluptatem ea itaque placeat eveniet
        minima consequatur? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Dignissimos alias, earum quisquam nam impedit expedita
        voluptatibus at iusto aut praesentium iste magni possimus? Incidunt,
        velit ad consectetur ipsam nesciunt quasi.
      </p>
      <p className="Information__paragraph">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
        excepturi temporibus quaerat aut eius quibusdam, velit non recusandae
        impedit delectus illum quos ipsam voluptatem ea itaque placeat eveniet
        minima consequatur? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Dignissimos alias, earum quisquam nam impedit expedita
        voluptatibus at iusto aut praesentium iste magni possimus? Incidunt,
        velit ad consectetur ipsam nesciunt quasi.
      </p>
      <h3 id="getting-started" className="Information__h3">Getting Started</h3>
      <p className="Information__paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vel ducimus nam illum neque. Incidunt animi veniam ratione tempore, vel error ipsa explicabo mollitia quibusdam unde minima quam rem vitae?</p>
      <ol className="Information__ol">
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae veritatis deserunt sit quisquam accusantium quam eum, soluta doloremque assumenda temporibus sint accusamus, blanditiis dignissimos aut ab ducimus veniam ad iure!</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et porro ipsum eaque, reprehenderit, non rerum debitis repudiandae vitae esse dicta nostrum tenetur dolorem facilis a ducimus. Modi accusantium maxime nam!</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eius, cumque est dolorem eum sed odio dolore, harum magni fuga cum adipisci voluptas deleniti magnam quis ut, maxime corrupti? Quasi.</li>
        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti dicta illum placeat ipsa voluptas excepturi, rem eligendi amet commodi saepe veniam, ea mollitia cum culpa expedita in laudantium, voluptatum dignissimos.</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos rem possimus ipsa deleniti dolorum, iste recusandae voluptate magni temporibus veniam reiciendis non aperiam error et aliquid obcaecati? Consectetur, cupiditate fugit!</li>
      </ol>
    </section>
  );
};

export default Information;
