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

function Item({
  name,
  children,
  deepLevel,
}: {
  name: string;
  children: Item[] | undefined;
  deepLevel: number;
}) {
  const [isHidden, setIsHidden] = useState(true);
  const handleClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    setIsHidden(!isHidden);
  };

  const plusSvgTpl = () => children?.length && (isHidden ? '+' : '-');

  return (
    <div style={{ paddingLeft: deepLevel * 10 }} onClick={handleClick}>
      {plusSvgTpl()}
      {name}
      {!isHidden &&
        children?.map((child: Item) => (
          <Item name={child.name} children={child.children} deepLevel={deepLevel + 1} />
        ))}
    </div>
  );
}

function App() {
  return (
    <>
      {files.map((file) => (
        <Item name={file.name} children={file.children} deepLevel={1} />
      ))}
    </>
  );
}

export default App;
