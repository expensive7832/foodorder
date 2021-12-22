import React from 'react'
import './footer.css'
import {IconButton, List,  ListItem, ListItemText, Typography } from '@material-ui/core'
import map from './../assets/map.jpg'
import { ArrowUpward, Facebook, LocationOn, WhatsApp } from '@material-ui/icons'
import { Link } from 'react-router-dom'


const Footer = () => {
    return (
        <footer id="footer">
            <div className="topFooter">
            <div>
                <Typography style={{ fontWeight: 'bold', color: '#fff'}} variant='h4'>Our Services</Typography>
                <List>
                    <ListItem style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start'}}>
                         <ListItemText>Selling</ListItemText>
                         <ListItemText>Auction</ListItemText>
                    </ListItem>
                </List>
            </div>
            <div>
                <Typography style={{ fontWeight: 'bold', color: '#fff'}} variant='h4'>About</Typography>
                <List>
                    <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Repellat numquam deserunt nostrum distinctio, ut accusamus officiis cupiditate perspiciatis 
                        fugiat porro veniam ratione dolorem! Modi molestiae eligendi, natus vel eveniet commodi.</Typography>
                </List>
            </div>
            <div>
                <Typography style={{ fontWeight: 'bold', color: '#fff'}} variant='h4'>Contact</Typography>
                <List>
                    <ListItem style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start'}}>
                         <ListItemText><a href='tel: =2348166398746'>+2348166398746</a></ListItemText>
                         <ListItemText><a href='mailto: expensive7832@gmail.com'>Expensive7832@gmail.com</a></ListItemText>
                         <ListItemText><a href='https://wa.me/08166398747'><WhatsApp/></a></ListItemText>
                         <ListItemText><a href=''><Facebook/></a></ListItemText>
                        
                    </ListItem>
                </List>
            </div>
            <div>
                <Typography style={{ fontWeight: 'bold', color: '#fff'}} variant='h4'>Location</Typography>
                    <div style={{textAlign: 'center', fontSize: '3rem'}} className='location'>
                    <a href="https://goo.gl/maps/USP6QwbqAyj8V6B89">
                    <IconButton>
                        <LocationOn/>
                    </IconButton>
                    </a>
                    </div>
                    
            </div>
            </div>

            <div className="bottomFooter">
                <>
                &copy;{new Date().getFullYear()}
                </>
                <>
               <a href="http://esquireyusuf.ml">Esq. Yusuf</a>
                </>
                <>
              <IconButton>
                  <ArrowUpward/>
              </IconButton>
                </>
            </div>

        </footer>
    )
}

export default Footer
