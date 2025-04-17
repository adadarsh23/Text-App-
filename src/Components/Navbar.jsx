import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  // BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import PropTypes from 'prop-types'
// import { title } from 'process'

// import {handleLoClick,handleUpClick,handleCopyClick,handleReSpace,handleOnClear,handleChange} from "./TextArea";




function Navbar(props) {
  // const text = props.text || ""; // Default to an empty string if not provided
  return (
    // <Breadcrumb>
    //   <BreadcrumbList>
    //     <BreadcrumbItem>
    //       <BreadcrumbLink href="/">Home</BreadcrumbLink>
    //     </BreadcrumbItem>
    //     <BreadcrumbSeparator />
    //     <BreadcrumbItem>
    //       <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    //     </BreadcrumbItem>
    //     <BreadcrumbSeparator />
    //     <BreadcrumbItem>
    //       <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    //     </BreadcrumbItem>
    //   </BreadcrumbList>
    // </Breadcrumb>
    <div>
      <nav className="navbar navbar-expand-xl navbar-dark bg-black">
        <Breadcrumb>
          <div className="container-fluid">
            <BreadcrumbList className="mb-0">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="navbar-brand font-weight-bold ">{props.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-light bg-dark" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="navbar-brand">{props.home}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-light bg-dark" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/about" className="navbar-brand">{props.tool}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </div>
        </Breadcrumb>
      </nav>
    </div >

  )

}
Navbar.propTypes = {
  title: PropTypes.string,
  home: PropTypes.string,
  tool: PropTypes.string,
}
Navbar.defaultProps = {
  title: "Set Text",
  home: "Set Home",
  tool: "Set Tools",
}
export default Navbar
