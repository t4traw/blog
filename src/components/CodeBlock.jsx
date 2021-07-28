import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import nord from 'react-syntax-highlighter/dist/cjs/styles/prism/nord'

// サポートしたい言語
import jsxx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import php from 'react-syntax-highlighter/dist/cjs/languages/prism/php'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import ruby from 'react-syntax-highlighter/dist/cjs/languages/prism/ruby'

// 必要な言語を登録
SyntaxHighlighter.registerLanguage('jsx', jsxx)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('php', php)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('ruby', ruby)

// コードブロック
const CodeBlock = ({ language }) => {
  const codeString = '(num) => num + 1';
  return (
    <SyntaxHighlighter language={language} style={nord}>
      {codeString}
    </SyntaxHighlighter>
  )
}
export default CodeBlock
