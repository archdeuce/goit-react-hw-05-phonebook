import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(!state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="titleContainer">
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={state}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', done, false);
            }}
            classNames="fade"
          >
            <h1>Phonebook</h1>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
}
