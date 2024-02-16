import React from "react"

class DefaultLayout extends React.Component {
  render() {
    return (
      <div className="prose lg:prose-lg my-0 max-w-full">
        <div className="p-3 text-center bg-black">
          <h2 id="heading" className="text-white">Gatsby with AsciiDoc and Tailwind</h2>
        </div>
        <div className="pt-6 mx-auto max-w-3xl">
        {this.props.children}
        </div>
      </div>
    )
  }
}

export default DefaultLayout
