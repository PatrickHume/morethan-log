import { NotionRenderer } from "react-notion-x"
import { TPost } from "@/src/types"
import React, {useEffect} from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import loadable from '@loadable/component';

const ConfController = loadable(() => {return Promise.all([
  import('prismjs/components/prism-markup-templating.js'),
  import('prismjs/components/prism-markup.js'),
  import('prismjs/components/prism-bash.js'),
  import('prismjs/components/prism-c.js'),
  import('prismjs/components/prism-cpp.js'),
  import('prismjs/components/prism-csharp.js'),
  import('prismjs/components/prism-java.js'),
  import('prismjs/components/prism-js-templates.js'),
  import('prismjs/components/prism-diff.js'),
  import('prismjs/components/prism-git.js'),
  import('prismjs/components/prism-go.js'),
  import('prismjs/components/prism-graphql.js'),
  import('prismjs/components/prism-glsl.js'),
  import('prismjs/components/prism-makefile.js'),
  import('prismjs/components/prism-markdown.js'),
  import('prismjs/components/prism-objectivec.js'),
  import('prismjs/components/prism-ocaml.js'),
  import('prismjs/components/prism-python.js'),
  import('prismjs/components/prism-rust.js'),
  import('prismjs/components/prism-solidity.js'),
  import('prismjs/components/prism-sql.js'),
  import('prismjs/components/prism-swift.js'),
  import('prismjs/components/prism-wasm.js'),
  import('prismjs/components/prism-yaml.js')
  ])})

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  blockMap: any
  data: TPost
}

const PageDetail: React.FC<Props> = ({ blockMap, data }) => {


  useEffect(() => {
    ConfController.preload();
}, []);

  return (
    <div className="m-auto max-w-4xl">
      <NotionRenderer
        recordMap={blockMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </div>
  )
}

export default PageDetail
