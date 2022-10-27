import { render, screen, fireEvent, cleanup,waitFor } from '@testing-library/react';
import React, { FC } from "react";
import Menu, { MenuProps } from "./menu";
import MenuItem from './menuItem';
import SubMenu from './submenu';

const testProps:MenuProps={
    defaultIndex:'0',
    onSelect:jest.fn(),
    className:'test'  
}

const testVerProps:MenuProps={
    defaultIndex:'0',
    mode:'vertical'
}

const generateMenu:FC<MenuProps>=(props:MenuProps)=>
    <Menu {...props}>
        <MenuItem  >active</MenuItem>
        <MenuItem  disabled>disabled</MenuItem>
        <MenuItem >mzx</MenuItem>
        <SubMenu title='dropdown'>
            <MenuItem>drop1</MenuItem>
        </SubMenu>
    </Menu>

const createStyleFile = () => {
    const cssFile: string = `
      .m-submenu {
        display: none;
      }
      .m-submenu.menu-opened {
        display: block;
      }
    `
    const style=document.createElement('style');
    style.setAttribute('type','text/css');
    style.innerHTML=cssFile;
    return style;
}


let menuElement: HTMLElement,activeElement: HTMLElement,disabledElement: HTMLElement;

describe('test Menu and MenuItem Component',()=>{
    
    beforeEach(()=>{
        //eslint-disable-next-line 
        const view=render(generateMenu(testProps) || <p>Error!</p>)
        //eslint-disable-next-line 
        view.container.append(createStyleFile())
        menuElement=screen.getByTestId('test-menu');
        activeElement=screen.getByText('active');
        disabledElement=screen.getByText('disabled')
        
    })

    it('should render correct Menu and MenuItem based on default props',()=>{
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('m-menu test');
        //eslint-disable-next-line 
        expect(menuElement.getElementsByTagName('li').length).toEqual(4);
        //eslint-disable-next-line 
        expect(menuElement.querySelectorAll(':scope >li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    })

    it('click items should change active and call the right callBack',()=>{
        const mzx=screen.getByText('mzx');
        fireEvent.click(mzx);
        expect(mzx).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).toHaveBeenCalledWith('2');
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })

    it('should render vertical mode when mode is set to vertical',()=>{
        cleanup();
        render(generateMenu(testVerProps) || <p>Error!</p>);
        const menuElement=screen.getByTestId('test-menu');
        expect(menuElement).toHaveClass('menu-vertical');
    })

    it('should show dropdown items when hover on subMenu',async ()=>{
        const dropdownElement=screen.getByText('dropdown');
        fireEvent.mouseEnter(dropdownElement);
        await waitFor(()=>{
            expect(screen.getByText('drop1')).toBeVisible();
        })
        fireEvent.click(screen.getByText('drop1'));
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
        fireEvent.mouseLeave(dropdownElement);
        await waitFor(()=>{
            expect(screen.getByText('drop1')).not.toBeVisible();
        })
    })
})

describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
        //eslint-disable-next-line
        const view=render(generateMenu(testVerProps)|| <p>Error</p>)
        //eslint-disable-next-line
        view.container.append(createStyleFile())
    })
    it('should render vertical mode when mode is set to vertical', () => {
      const menuElement = screen.getByTestId('test-menu')
      expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when click on subMenu for vertical mode', () => {
      fireEvent.click(screen.getByText('dropdown'))
      const dropDownItem = screen.queryByText('drop1')
      expect(dropDownItem).toBeVisible()
    })
  })