import { MouseEvent, useState } from 'react';
import './App.css';

type Item = {
  name: string;
  children?: Item[];
};

const files: Item[] = [
  {
    name: 'src',
    children: [
      {
        name: 'main.tsx',
      },
      {
        name: 'App.tsx',
      },
      {
        name: 'index.css',
      },
      {
        name: 'assets',
        children: [
          {
            name: 'react.svg',
          },
          {
            name: 'vite.svg',
          },
        ],
      },
    ],
  },
  {
    name: 'package.json',
  },
  {
    name: 'tsconfig.json',
  },
];

function Item({ name, children }: { name: string; children: Item[] | undefined }) {
  const [isHidden, setIsHidden] = useState(true);
  const handleClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    setIsHidden(!isHidden);
  };

  const plusSvgTpl = () => children?.length && (isHidden ? '+' : '-');

  return (
    <li
      style={{ marginLeft: 10 }}
      onClick={handleClick}
      aria-expanded={!isHidden}
      aria-controls="items-list"
    >
      {plusSvgTpl()}
      {name}
      <ul id="items-list">
        {!isHidden &&
          children?.map((child: Item) => <Item name={child.name} children={child.children} />)}
      </ul>
    </li>
  );
}

function App() {
  return (
    <>
      {files.map((file) => (
        <ul>
          <Item name={file.name} children={file.children} />
        </ul>
      ))}
    </>
  );
}

export default App;
