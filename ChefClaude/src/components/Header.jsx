import chefClaudeLogo from '../images/chef-claude-icon.png'

export function Header() {
    return (
        <header>
            <nav className="navbar ">
                <img src={chefClaudeLogo} alt="chef logo" />
                <h1>Chef Claude</h1>
            </nav>
        </header>
    )
}