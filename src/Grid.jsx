import React from 'react'

function Grid() {
  const elements = [
    { name: "Full Stack Developer", image: "../src/images/amazon.png" },
    { name: "Node Js Developer", image: "../src/images/tesla.png" },
    { name: "UX/UI Designer", image: "../src/images/swiggy.png" },
    { name: "Full Stack Developer", image: "../src/images/amazon.png" },
    { name: "Node Js Developer", image: "../src/images/tesla.png" },
    { name: "UX/UI Designer", image: "../src/images/swiggy.png" },
    { name: "Full Stack Developer", image: "../src/images/amazon.png" },
    { name: "Node Js Developer", image: "../src/images/tesla.png" }
  ]
  return (
    <div className="gridmain">
      {elements.map((element, index) => (
        <div key={index} className="element">
          <div className='amazon'><img src={element.image} alt={element.name} /></div>
          <div className='role'>{element.name}</div>
          <div className='exp'>
            <div className='exps'>
              <img src='../src/images/exp.png' />
              <div className='exptext'>1-3 yr Exp</div>
            </div>
            <div className='exps'>
              <img src='../src/images/onsite.png' />
              <div className='exptext'>Onsite</div>
            </div>
            <div className='exps'>
              <img src='../src/images/lpa.png' />
              <div className='exptext'>12 LPA</div>
            </div>
          </div>
          <div className='discrip'>
            <ul>
              <li>A user-friendly interface lets you browse stunning photos and videos </li>
              <li>Filter destinations based on interests and travel style, and create personalized</li>
            </ul>
          </div>
          <div className='apply'><button className='applybt'>Apply Now</button></div>
          <div className='ago'>24h Ago</div>
        </div>
      ))}
    </div>
  )
}

export default Grid
