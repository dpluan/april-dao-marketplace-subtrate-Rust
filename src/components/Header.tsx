import { useConnectWallet } from '../hooks/useConnectWallet';
import { Button } from './NormalButton';
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { setCurrentAccount } from '../store/commonSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const [currentAccount, connectWallet, allAccounts] = useConnectWallet();
  const dispatch = useDispatch();

  const onClick = ({ key }: { key: string }) => {
    dispatch(
      setCurrentAccount({
        address: key,
        type: 'sr25519',
        meta: { genesisHash: '', name: '', source: 'polkadot-js' },
      })
    );
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={allAccounts?.map((item) => {
        return {
          label: `${item.meta.name} - ${item.address.substring(0, 10)}`,
          key: item.address,
        };
      })}
    />
  );

  return (
    <header>
      <nav
        aria-label="menu nav"
        className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0"
      >
        <div className="flex flex-wrap items-center">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
            <a href="#" aria-label="Home">
              <span className="text-xl pl-2">
                <i className="em em-grinning"></i>
              </span>
            </a>
          </div>

          <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2"></div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li className="flex-1 md:flex-none md:mr-3">
                <div className="relative  inline-block text-white">
                  <div className="flex">
                    {currentAccount && (
                      <Dropdown overlay={menu}>
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            Hi, {currentAccount.address.substring(0, 10)}
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                    )}
                    {!currentAccount && (
                      <Button onClick={connectWallet}>Connect wallet</Button>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
