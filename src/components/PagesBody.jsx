import Projects from './Pages/Projects';
import About from './Pages/About';
import Contact from './Pages/Contact';

const PagesBody = (props) => {
    return(
        <div className="container pages shadow-lg">      
            {props.page === 'Projects' ? <Projects/>: props.page == 'Contact' ? <Contact/>:<About/>}    
        </div>
    )
}
    
export default PagesBody