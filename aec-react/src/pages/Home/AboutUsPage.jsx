import React from 'react'
import { NavbarHome } from '../../components/NavbarHome.jsx'
import './homeStyle.css'
import info from '../../assets/info.png'

export const AboutUsPage = () => {
    return (
        <div className="text-center" >
            <div className='d-flex mx-5 py-2 flex-column text-center conLogin'>

                <NavbarHome />
            </div>
            <div className="p-5 bg-image" style={{
                height: '250px',
                backgroundImage: `url('https://img.freepik.com/free-photo/fantastic-blue-sky_1203-1929.jpg?w=996&t=st=1683838238~exp=1683838838~hmac=488e0f00855dd85560dee7eaa798f29a16699300c15d4e3f4e9edcad98586d8c')`,
                backgroundSize: 'cover'

            }} >
            </div>

            <div className="card mx-4 mx-md-5 shadow-5-strong" style={{
                marginTop: '-175px',
                background: `transparent`,
                backdropFilter: `blur(30px)`,
                border: 'none'
            }}>
                <div className="card-body py-5 px-md-5">

                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">About Us</h2>
                            <div className='d-flex justify-content-center ' >
                                <div className='d-flex justify-content-center rounded' style={{
                                    backgroundImage: `url('https://media.iatiseguros.com/wp-content/uploads/2022/08/28035505/mejores-playas-mexico-1.jpg')`,
                                    backgroundSize: 'cover',
                                    height: '500px'
                                }}>

                                    <h1 className='text-dark mx-3 mt-6'
                                        style={{ marginTop: '200px' }}
                                    >AEC is the perfect choice to reserve your stay in a hotel. Enjoy the travel with us!
                                    </h1>
                                </div>
                                {/* <img src="https://content2.buscounchollo.com/chollo/vacaciones-en-la-playa.jpg1651476600.jpeg" className="rounded opacity-50 text-dark"
                                    
                                ></img> */}

                            </div>
                            <div className='mt-5'>
                                <h2 className="fw-bold mb-5"><u>Bring to you</u></h2>
                                <div className='d-flex justify-content-center  mb-3 mt-3 mx-2 flex-wrap'>
                                    <div className="card ms-4 mt-2 shadow p-3 mb-5 bg-body rounded" style={{ width: '13rem' }}>
                                        <img className='rounded-circle' src="https://static.anuevayork.com/wp-content/uploads/2019/07/11084916/Como-visitar-la-Estatua-de-la-Libertad-en-Nueva-York-1500-2.jpg" alt="" />
                                        <br />
                                        <h4 className='responsive-font-example'>Freedom</h4>
                                    </div>
                                    <div className="card ms-4 mt-2 shadow p-3 mb-5 bg-body rounded" style={{ width: '13rem' }}>
                                        <img className='rounded-circle' src="https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic2709904-copia.jpg?w=1900&h=1379" alt="" />
                                        <br />
                                        <h4>Security</h4>
                                    </div>
                                    <div className="card ms-4 mt-2 shadow p-3 mb-5 bg-body rounded" style={{ width: '13rem' }}>
                                        <img className='rounded-circle' src="https://st3.idealista.com/news/archivos/styles/fullwidth_xl/public/2023-01/images/nuno_lopes_pixabay_eiffel-tower-975004.jpg?VersionId=GSLsuBuQX5zEWFMLdVq4umuoTPY4TrMJ&itok=2iB8MKEd" alt="" />
                                        <br />
                                        <h4>Experiences</h4>
                                    </div>
                                    <div className="card ms-4 mt-2 shadow p-3 mb-5 bg-body rounded" style={{ width: '13rem' }}>
                                        <img className='rounded-circle' src="https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic2743994.jpg?w=1900&h=1195" alt="" />
                                        <br />
                                        <h4>Adventure</h4>
                                    </div>
                                </div>
                                <h2 className="fw-bold mb-5"><u>Our Clients</u></h2>
                                <div className='d-flex justify-content-center  mb-3 mt-3 mx-2 flex-wrap'>
                                    <section className="clientes contenedor">
                                        <div className="cards">
                                            <div className="card">
                                                <img src="https://randomuser.me/api/portraits/women/4.jpg" alt="" />
                                                <div className="contenido-texto-card">
                                                    <h4>Jennifer Stuart</h4>
                                                    <p>With AEC i feel comfrotable at the moment that when I travel</p>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <img src="https://randomuser.me/api/portraits/women/6.jpg" alt="" />
                                                <div className="contenido-texto-card">
                                                    <h4>Jazmín Brooke</h4>
                                                    <p>The quality is amaizing, love the hoteles, the locations , everything</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="mt-auto">
                <p className='text-dark'>Arc-En-Ciel®</p>
            </footer>
        </div>
    )
}
