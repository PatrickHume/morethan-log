import { NotionRenderer } from "react-notion-x"
import { TPost } from "@/src/types"
import React, { useState, ChangeEvent, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"

import './prism.css'
import Prism from "prismjs";

export function CodeBlockTile() {
  const language = "javascript"

  const codeElement = useRef<HTMLElement | null>(null);
  const [internalText, setInternalText] = useState<string>("")

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInternalText(event.target.value);
  };

  useEffect(() => {
    if (codeElement.current) {
      Prism.highlightElement(codeElement.current)
    }
  }, [internalText])


  return (
    <div>
      <textarea onChange={handleChange} value={internalText}>

      </textarea>
      <pre>
        <code ref={codeElement} className={`language-${language}`}>
          {internalText}
        </code>
      </pre>
    </div>
  )
}

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => m)
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
