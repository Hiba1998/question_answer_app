import { render, screen,fireEvent} from '@testing-library/react';
import App from './App';
import {MemoryRouter} from 'react-router-dom';
import QuestionsList from './components/Questions/QuestionsList';
import SignOut from './components/SignOut';
describe('sign in component',() =>{

  test('renders Sign in Page', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkElement = screen.getByText('Please enter your password');
    expect(linkElement).toBeInTheDocument();
  });
  
})
describe('sign out component',() =>{

  test('renders Sign out Page', () => {
    render(<MemoryRouter><SignOut/></MemoryRouter>);
    const linkElement = screen.getByText('Sign out');
    expect(linkElement).toBeInTheDocument();
  });
  
})

describe('QuesyionsList component',() =>{

  test('renders questions if request succeeds ', async  () => {
    render(<MemoryRouter><QuestionsList/></MemoryRouter>);

    const questions = await screen.findAllByRole('table');
    expect(questions).not.toHaveLength(0);
    
  });

  
  test('dialog appears once add question is clicked', async() => {
     render(<MemoryRouter><QuestionsList/></MemoryRouter>);
    //Dialog closed once page is rendered
    const DialogClosed =  screen.queryByText('Post a new question')
    expect(DialogClosed).not.toBeInTheDocument()

    // once button clicked 
    const addquestion = await screen.findByText('Add Question')
    fireEvent.click(addquestion)
    const DialogOpened = screen.queryByText('Post a new question')
    expect(DialogOpened).toBeInTheDocument()

  });
  
})