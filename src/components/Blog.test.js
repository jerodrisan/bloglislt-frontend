import React from 'react';
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Blog from './Blog';


test ('rendes blog', ()=>{

    const blog = {
        title:" titulo de prueba",
        author:" manolo manolazo", 
        url : "http://asfasdf"        
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('titulo de prueba by manolo manolazo' )


    // render (<Blog Blog blog={blog}/>)
    // const element = screen.getByText('titulo de prueba by manolo manolazo http://asfasdf')   
    // expect(element).toBeDefined()

    })