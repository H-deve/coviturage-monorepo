'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">covoiturage documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-aef5c9a9c12f4e06a5b1c4419d9ae33662b10c43bdb75132d0d9d4748b1b7d8f752230aa327d68e7998cc645f3a11ce2e0d2c0180e58da16b080af0da7a54d54"' : 'data-bs-target="#xs-controllers-links-module-AppModule-aef5c9a9c12f4e06a5b1c4419d9ae33662b10c43bdb75132d0d9d4748b1b7d8f752230aa327d68e7998cc645f3a11ce2e0d2c0180e58da16b080af0da7a54d54"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-aef5c9a9c12f4e06a5b1c4419d9ae33662b10c43bdb75132d0d9d4748b1b7d8f752230aa327d68e7998cc645f3a11ce2e0d2c0180e58da16b080af0da7a54d54"' :
                                            'id="xs-controllers-links-module-AppModule-aef5c9a9c12f4e06a5b1c4419d9ae33662b10c43bdb75132d0d9d4748b1b7d8f752230aa327d68e7998cc645f3a11ce2e0d2c0180e58da16b080af0da7a54d54"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-aef5c9a9c12f4e06a5b1c4419d9ae33662b10c43bdb75132d0d9d4748b1b7d8f752230aa327d68e7998cc645f3a11ce2e0d2c0180e58da16b080af0da7a54d54"' : 'data-bs-target="#xs-injectables-links-module-AppModule-aef5c9a9c12f4e06a5b1c4419d9ae33662b10c43bdb75132d0d9d4748b1b7d8f752230aa327d68e7998cc645f3a11ce2e0d2c0180e58da16b080af0da7a54d54"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-aef5c9a9c12f4e06a5b1c4419d9ae33662b10c43bdb75132d0d9d4748b1b7d8f752230aa327d68e7998cc645f3a11ce2e0d2c0180e58da16b080af0da7a54d54"' :
                                        'id="xs-injectables-links-module-AppModule-aef5c9a9c12f4e06a5b1c4419d9ae33662b10c43bdb75132d0d9d4748b1b7d8f752230aa327d68e7998cc645f3a11ce2e0d2c0180e58da16b080af0da7a54d54"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-d1a4b098525f6e60e2006085078471ed8cd2e2220fd4848fe76c4eefb66da8c92d8640f2cc7296432c48742642b328454107dbc3759c029ecf796a729933dbf4"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-d1a4b098525f6e60e2006085078471ed8cd2e2220fd4848fe76c4eefb66da8c92d8640f2cc7296432c48742642b328454107dbc3759c029ecf796a729933dbf4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-d1a4b098525f6e60e2006085078471ed8cd2e2220fd4848fe76c4eefb66da8c92d8640f2cc7296432c48742642b328454107dbc3759c029ecf796a729933dbf4"' :
                                            'id="xs-controllers-links-module-AuthModule-d1a4b098525f6e60e2006085078471ed8cd2e2220fd4848fe76c4eefb66da8c92d8640f2cc7296432c48742642b328454107dbc3759c029ecf796a729933dbf4"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-d1a4b098525f6e60e2006085078471ed8cd2e2220fd4848fe76c4eefb66da8c92d8640f2cc7296432c48742642b328454107dbc3759c029ecf796a729933dbf4"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-d1a4b098525f6e60e2006085078471ed8cd2e2220fd4848fe76c4eefb66da8c92d8640f2cc7296432c48742642b328454107dbc3759c029ecf796a729933dbf4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d1a4b098525f6e60e2006085078471ed8cd2e2220fd4848fe76c4eefb66da8c92d8640f2cc7296432c48742642b328454107dbc3759c029ecf796a729933dbf4"' :
                                        'id="xs-injectables-links-module-AuthModule-d1a4b098525f6e60e2006085078471ed8cd2e2220fd4848fe76c4eefb66da8c92d8640f2cc7296432c48742642b328454107dbc3759c029ecf796a729933dbf4"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokenStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmailModule-46c113d0b48a9aef5ec17b12393b69250a8053bdac44f285c216e5e631d5e9c598721fa9c4c0377c8f1c04c63f1634a23bb9a151f623c1da946877cd22de6db2"' : 'data-bs-target="#xs-injectables-links-module-EmailModule-46c113d0b48a9aef5ec17b12393b69250a8053bdac44f285c216e5e631d5e9c598721fa9c4c0377c8f1c04c63f1634a23bb9a151f623c1da946877cd22de6db2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-46c113d0b48a9aef5ec17b12393b69250a8053bdac44f285c216e5e631d5e9c598721fa9c4c0377c8f1c04c63f1634a23bb9a151f623c1da946877cd22de6db2"' :
                                        'id="xs-injectables-links-module-EmailModule-46c113d0b48a9aef5ec17b12393b69250a8053bdac44f285c216e5e631d5e9c598721fa9c4c0377c8f1c04c63f1634a23bb9a151f623c1da946877cd22de6db2"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InscriptionModule.html" data-type="entity-link" >InscriptionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-InscriptionModule-4ad7c7f1d1e24374c0ead70109100f487430e0c6203820fe085c62e8905d8447650472e81c98ff93a0ac654a9c5761ebf4227db41e3e3f502cb0feb299687eb4"' : 'data-bs-target="#xs-controllers-links-module-InscriptionModule-4ad7c7f1d1e24374c0ead70109100f487430e0c6203820fe085c62e8905d8447650472e81c98ff93a0ac654a9c5761ebf4227db41e3e3f502cb0feb299687eb4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InscriptionModule-4ad7c7f1d1e24374c0ead70109100f487430e0c6203820fe085c62e8905d8447650472e81c98ff93a0ac654a9c5761ebf4227db41e3e3f502cb0feb299687eb4"' :
                                            'id="xs-controllers-links-module-InscriptionModule-4ad7c7f1d1e24374c0ead70109100f487430e0c6203820fe085c62e8905d8447650472e81c98ff93a0ac654a9c5761ebf4227db41e3e3f502cb0feb299687eb4"' }>
                                            <li class="link">
                                                <a href="controllers/InscriptionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InscriptionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-InscriptionModule-4ad7c7f1d1e24374c0ead70109100f487430e0c6203820fe085c62e8905d8447650472e81c98ff93a0ac654a9c5761ebf4227db41e3e3f502cb0feb299687eb4"' : 'data-bs-target="#xs-injectables-links-module-InscriptionModule-4ad7c7f1d1e24374c0ead70109100f487430e0c6203820fe085c62e8905d8447650472e81c98ff93a0ac654a9c5761ebf4227db41e3e3f502cb0feb299687eb4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InscriptionModule-4ad7c7f1d1e24374c0ead70109100f487430e0c6203820fe085c62e8905d8447650472e81c98ff93a0ac654a9c5761ebf4227db41e3e3f502cb0feb299687eb4"' :
                                        'id="xs-injectables-links-module-InscriptionModule-4ad7c7f1d1e24374c0ead70109100f487430e0c6203820fe085c62e8905d8447650472e81c98ff93a0ac654a9c5761ebf4227db41e3e3f502cb0feb299687eb4"' }>
                                        <li class="link">
                                            <a href="injectables/InscriptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InscriptionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MarqueModule.html" data-type="entity-link" >MarqueModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MarqueModule-c50f8eb153ab9dfa3b1e14143d18419ca26b19f01a624ef24a63752ff5405b55224a1d308e6ddcd897a60cfec4dc5dd410006242407035f8fb16990a51c72261"' : 'data-bs-target="#xs-controllers-links-module-MarqueModule-c50f8eb153ab9dfa3b1e14143d18419ca26b19f01a624ef24a63752ff5405b55224a1d308e6ddcd897a60cfec4dc5dd410006242407035f8fb16990a51c72261"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MarqueModule-c50f8eb153ab9dfa3b1e14143d18419ca26b19f01a624ef24a63752ff5405b55224a1d308e6ddcd897a60cfec4dc5dd410006242407035f8fb16990a51c72261"' :
                                            'id="xs-controllers-links-module-MarqueModule-c50f8eb153ab9dfa3b1e14143d18419ca26b19f01a624ef24a63752ff5405b55224a1d308e6ddcd897a60cfec4dc5dd410006242407035f8fb16990a51c72261"' }>
                                            <li class="link">
                                                <a href="controllers/MarqueController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MarqueController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MarqueModule-c50f8eb153ab9dfa3b1e14143d18419ca26b19f01a624ef24a63752ff5405b55224a1d308e6ddcd897a60cfec4dc5dd410006242407035f8fb16990a51c72261"' : 'data-bs-target="#xs-injectables-links-module-MarqueModule-c50f8eb153ab9dfa3b1e14143d18419ca26b19f01a624ef24a63752ff5405b55224a1d308e6ddcd897a60cfec4dc5dd410006242407035f8fb16990a51c72261"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MarqueModule-c50f8eb153ab9dfa3b1e14143d18419ca26b19f01a624ef24a63752ff5405b55224a1d308e6ddcd897a60cfec4dc5dd410006242407035f8fb16990a51c72261"' :
                                        'id="xs-injectables-links-module-MarqueModule-c50f8eb153ab9dfa3b1e14143d18419ca26b19f01a624ef24a63752ff5405b55224a1d308e6ddcd897a60cfec4dc5dd410006242407035f8fb16990a51c72261"' }>
                                        <li class="link">
                                            <a href="injectables/MarqueService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MarqueService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilModule.html" data-type="entity-link" >ProfilModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProfilModule-1e43538feb89dde75940459e490e5c4cb334ee35744bd63c856b2daa4aae29d924b85d5150dd992d47384f6eabeb8812a2eb3444ed703f939dd42e6202ea6526"' : 'data-bs-target="#xs-controllers-links-module-ProfilModule-1e43538feb89dde75940459e490e5c4cb334ee35744bd63c856b2daa4aae29d924b85d5150dd992d47384f6eabeb8812a2eb3444ed703f939dd42e6202ea6526"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProfilModule-1e43538feb89dde75940459e490e5c4cb334ee35744bd63c856b2daa4aae29d924b85d5150dd992d47384f6eabeb8812a2eb3444ed703f939dd42e6202ea6526"' :
                                            'id="xs-controllers-links-module-ProfilModule-1e43538feb89dde75940459e490e5c4cb334ee35744bd63c856b2daa4aae29d924b85d5150dd992d47384f6eabeb8812a2eb3444ed703f939dd42e6202ea6526"' }>
                                            <li class="link">
                                                <a href="controllers/ProfilController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProfilModule-1e43538feb89dde75940459e490e5c4cb334ee35744bd63c856b2daa4aae29d924b85d5150dd992d47384f6eabeb8812a2eb3444ed703f939dd42e6202ea6526"' : 'data-bs-target="#xs-injectables-links-module-ProfilModule-1e43538feb89dde75940459e490e5c4cb334ee35744bd63c856b2daa4aae29d924b85d5150dd992d47384f6eabeb8812a2eb3444ed703f939dd42e6202ea6526"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfilModule-1e43538feb89dde75940459e490e5c4cb334ee35744bd63c856b2daa4aae29d924b85d5150dd992d47384f6eabeb8812a2eb3444ed703f939dd42e6202ea6526"' :
                                        'id="xs-injectables-links-module-ProfilModule-1e43538feb89dde75940459e490e5c4cb334ee35744bd63c856b2daa4aae29d924b85d5150dd992d47384f6eabeb8812a2eb3444ed703f939dd42e6202ea6526"' }>
                                        <li class="link">
                                            <a href="injectables/ProfilService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TrajetModule.html" data-type="entity-link" >TrajetModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TrajetModule-8fe12129d359f28e25992e48c578132393c3673feb313123b1e15a12346636e7d35061e339eb9faf4bb5315b54c81ae7eeb904a39bae8777d5987ffe0a1a85e9"' : 'data-bs-target="#xs-controllers-links-module-TrajetModule-8fe12129d359f28e25992e48c578132393c3673feb313123b1e15a12346636e7d35061e339eb9faf4bb5315b54c81ae7eeb904a39bae8777d5987ffe0a1a85e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TrajetModule-8fe12129d359f28e25992e48c578132393c3673feb313123b1e15a12346636e7d35061e339eb9faf4bb5315b54c81ae7eeb904a39bae8777d5987ffe0a1a85e9"' :
                                            'id="xs-controllers-links-module-TrajetModule-8fe12129d359f28e25992e48c578132393c3673feb313123b1e15a12346636e7d35061e339eb9faf4bb5315b54c81ae7eeb904a39bae8777d5987ffe0a1a85e9"' }>
                                            <li class="link">
                                                <a href="controllers/TrajetController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrajetController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TrajetModule-8fe12129d359f28e25992e48c578132393c3673feb313123b1e15a12346636e7d35061e339eb9faf4bb5315b54c81ae7eeb904a39bae8777d5987ffe0a1a85e9"' : 'data-bs-target="#xs-injectables-links-module-TrajetModule-8fe12129d359f28e25992e48c578132393c3673feb313123b1e15a12346636e7d35061e339eb9faf4bb5315b54c81ae7eeb904a39bae8777d5987ffe0a1a85e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TrajetModule-8fe12129d359f28e25992e48c578132393c3673feb313123b1e15a12346636e7d35061e339eb9faf4bb5315b54c81ae7eeb904a39bae8777d5987ffe0a1a85e9"' :
                                        'id="xs-injectables-links-module-TrajetModule-8fe12129d359f28e25992e48c578132393c3673feb313123b1e15a12346636e7d35061e339eb9faf4bb5315b54c81ae7eeb904a39bae8777d5987ffe0a1a85e9"' }>
                                        <li class="link">
                                            <a href="injectables/TrajetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrajetService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UtilisateurModule.html" data-type="entity-link" >UtilisateurModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UtilisateurModule-765c6c280b7ef90f83db3d07c25b4e2a10f1ee709caf360952969bc28c4efd734a1f8aefa57b51bfd41e05d71f719113b40edb4d532bfa86afed73dea5524c61"' : 'data-bs-target="#xs-controllers-links-module-UtilisateurModule-765c6c280b7ef90f83db3d07c25b4e2a10f1ee709caf360952969bc28c4efd734a1f8aefa57b51bfd41e05d71f719113b40edb4d532bfa86afed73dea5524c61"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UtilisateurModule-765c6c280b7ef90f83db3d07c25b4e2a10f1ee709caf360952969bc28c4efd734a1f8aefa57b51bfd41e05d71f719113b40edb4d532bfa86afed73dea5524c61"' :
                                            'id="xs-controllers-links-module-UtilisateurModule-765c6c280b7ef90f83db3d07c25b4e2a10f1ee709caf360952969bc28c4efd734a1f8aefa57b51bfd41e05d71f719113b40edb4d532bfa86afed73dea5524c61"' }>
                                            <li class="link">
                                                <a href="controllers/UtilisateurController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilisateurController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UtilisateurModule-765c6c280b7ef90f83db3d07c25b4e2a10f1ee709caf360952969bc28c4efd734a1f8aefa57b51bfd41e05d71f719113b40edb4d532bfa86afed73dea5524c61"' : 'data-bs-target="#xs-injectables-links-module-UtilisateurModule-765c6c280b7ef90f83db3d07c25b4e2a10f1ee709caf360952969bc28c4efd734a1f8aefa57b51bfd41e05d71f719113b40edb4d532bfa86afed73dea5524c61"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UtilisateurModule-765c6c280b7ef90f83db3d07c25b4e2a10f1ee709caf360952969bc28c4efd734a1f8aefa57b51bfd41e05d71f719113b40edb4d532bfa86afed73dea5524c61"' :
                                        'id="xs-injectables-links-module-UtilisateurModule-765c6c280b7ef90f83db3d07c25b4e2a10f1ee709caf360952969bc28c4efd734a1f8aefa57b51bfd41e05d71f719113b40edb4d532bfa86afed73dea5524c61"' }>
                                        <li class="link">
                                            <a href="injectables/UtilisateurService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilisateurService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VilleModule.html" data-type="entity-link" >VilleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VilleModule-a4535c44a54731c3973c5118cba9c00fba436a43f9532b8a7cbecbe1b95e34097666eabcc296f0051d7a4a757a7933019c10671b7c8de2a5b9b8d007a71073eb"' : 'data-bs-target="#xs-controllers-links-module-VilleModule-a4535c44a54731c3973c5118cba9c00fba436a43f9532b8a7cbecbe1b95e34097666eabcc296f0051d7a4a757a7933019c10671b7c8de2a5b9b8d007a71073eb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VilleModule-a4535c44a54731c3973c5118cba9c00fba436a43f9532b8a7cbecbe1b95e34097666eabcc296f0051d7a4a757a7933019c10671b7c8de2a5b9b8d007a71073eb"' :
                                            'id="xs-controllers-links-module-VilleModule-a4535c44a54731c3973c5118cba9c00fba436a43f9532b8a7cbecbe1b95e34097666eabcc296f0051d7a4a757a7933019c10671b7c8de2a5b9b8d007a71073eb"' }>
                                            <li class="link">
                                                <a href="controllers/VilleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VilleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VilleModule-a4535c44a54731c3973c5118cba9c00fba436a43f9532b8a7cbecbe1b95e34097666eabcc296f0051d7a4a757a7933019c10671b7c8de2a5b9b8d007a71073eb"' : 'data-bs-target="#xs-injectables-links-module-VilleModule-a4535c44a54731c3973c5118cba9c00fba436a43f9532b8a7cbecbe1b95e34097666eabcc296f0051d7a4a757a7933019c10671b7c8de2a5b9b8d007a71073eb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VilleModule-a4535c44a54731c3973c5118cba9c00fba436a43f9532b8a7cbecbe1b95e34097666eabcc296f0051d7a4a757a7933019c10671b7c8de2a5b9b8d007a71073eb"' :
                                        'id="xs-injectables-links-module-VilleModule-a4535c44a54731c3973c5118cba9c00fba436a43f9532b8a7cbecbe1b95e34097666eabcc296f0051d7a4a757a7933019c10671b7c8de2a5b9b8d007a71073eb"' }>
                                        <li class="link">
                                            <a href="injectables/VilleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VilleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VoitureModule.html" data-type="entity-link" >VoitureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VoitureModule-004f3bae9989c307f51ac7298a288fea9d77c0b7271a9dc279f5a761ef47f1e6e387f356d4fd4da7fd935573d0b3f414c4ebd25c0252a31e98eff53afbfdb7fb"' : 'data-bs-target="#xs-controllers-links-module-VoitureModule-004f3bae9989c307f51ac7298a288fea9d77c0b7271a9dc279f5a761ef47f1e6e387f356d4fd4da7fd935573d0b3f414c4ebd25c0252a31e98eff53afbfdb7fb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VoitureModule-004f3bae9989c307f51ac7298a288fea9d77c0b7271a9dc279f5a761ef47f1e6e387f356d4fd4da7fd935573d0b3f414c4ebd25c0252a31e98eff53afbfdb7fb"' :
                                            'id="xs-controllers-links-module-VoitureModule-004f3bae9989c307f51ac7298a288fea9d77c0b7271a9dc279f5a761ef47f1e6e387f356d4fd4da7fd935573d0b3f414c4ebd25c0252a31e98eff53afbfdb7fb"' }>
                                            <li class="link">
                                                <a href="controllers/VoitureController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VoitureController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VoitureModule-004f3bae9989c307f51ac7298a288fea9d77c0b7271a9dc279f5a761ef47f1e6e387f356d4fd4da7fd935573d0b3f414c4ebd25c0252a31e98eff53afbfdb7fb"' : 'data-bs-target="#xs-injectables-links-module-VoitureModule-004f3bae9989c307f51ac7298a288fea9d77c0b7271a9dc279f5a761ef47f1e6e387f356d4fd4da7fd935573d0b3f414c4ebd25c0252a31e98eff53afbfdb7fb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VoitureModule-004f3bae9989c307f51ac7298a288fea9d77c0b7271a9dc279f5a761ef47f1e6e387f356d4fd4da7fd935573d0b3f414c4ebd25c0252a31e98eff53afbfdb7fb"' :
                                        'id="xs-injectables-links-module-VoitureModule-004f3bae9989c307f51ac7298a288fea9d77c0b7271a9dc279f5a761ef47f1e6e387f356d4fd4da7fd935573d0b3f414c4ebd25c0252a31e98eff53afbfdb7fb"' }>
                                        <li class="link">
                                            <a href="injectables/VoitureService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VoitureService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/InscriptionController.html" data-type="entity-link" >InscriptionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MarqueController.html" data-type="entity-link" >MarqueController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProfilController.html" data-type="entity-link" >ProfilController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TrajetController.html" data-type="entity-link" >TrajetController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UtilisateurController.html" data-type="entity-link" >UtilisateurController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/VilleController.html" data-type="entity-link" >VilleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/VoitureController.html" data-type="entity-link" >VoitureController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Inscription.html" data-type="entity-link" >Inscription</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Marque.html" data-type="entity-link" >Marque</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Profil.html" data-type="entity-link" >Profil</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Trajet.html" data-type="entity-link" >Trajet</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Utilisateur.html" data-type="entity-link" >Utilisateur</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Ville.html" data-type="entity-link" >Ville</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Voiture.html" data-type="entity-link" >Voiture</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInscriptionDto.html" data-type="entity-link" >CreateInscriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMarqueDto.html" data-type="entity-link" >CreateMarqueDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfilDto.html" data-type="entity-link" >CreateProfilDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTrajetDto.html" data-type="entity-link" >CreateTrajetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUtilisateurDto.html" data-type="entity-link" >CreateUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateVilleDto.html" data-type="entity-link" >CreateVilleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateVoitureDto.html" data-type="entity-link" >CreateVoitureDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUtilisateurDto.html" data-type="entity-link" >RegisterUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInscriptionDto.html" data-type="entity-link" >UpdateInscriptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMarqueDto.html" data-type="entity-link" >UpdateMarqueDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfilDto.html" data-type="entity-link" >UpdateProfilDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTrajetDto.html" data-type="entity-link" >UpdateTrajetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUtilisateurDto.html" data-type="entity-link" >UpdateUtilisateurDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVilleDto.html" data-type="entity-link" >UpdateVilleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVoitureDto.html" data-type="entity-link" >UpdateVoitureDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InscriptionService.html" data-type="entity-link" >InscriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MarqueService.html" data-type="entity-link" >MarqueService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfilService.html" data-type="entity-link" >ProfilService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshAuthGuard.html" data-type="entity-link" >RefreshAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenStrategy.html" data-type="entity-link" >RefreshTokenStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrajetService.html" data-type="entity-link" >TrajetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilisateurService.html" data-type="entity-link" >UtilisateurService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VilleService.html" data-type="entity-link" >VilleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VoitureService.html" data-type="entity-link" >VoitureService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});