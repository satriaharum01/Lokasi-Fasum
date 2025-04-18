
        <div class="header py-4">
          <div class="container">
            <div class="d-flex">
              <a class="align-items-center header-brand row" href="./index.html">
                <img src="{{asset('assets/img/logo.png')}}" class="header-brand-img" alt="tabler logo">
                <div class="ml-2 row flex-column ">
                  <h5 style="line-height: 10px;">{{ucwords( env('APP_DESCRIPTION'))}}</h5>
                  <h6 style="line-height: 0px;">{{ucwords( env('APP_NAME'))}}</h6>
                </div>
              </a>
              <div class="d-flex order-lg-2 ml-auto">
                <div class="dropdown">
                  <a href="#" class="nav-link pr-0 leading-none" data-toggle="dropdown">
                    <span class="avatar" style="background-image: url({{asset('/assets/img/faces/'.Auth::user()->faces)}})"></span>
                    <span class="ml-2 d-none d-lg-block">
                      <span class="text-default">{{Auth::user()->name}}</span>
                      <small class="text-muted d-block mt-1">{{ ucfirst (Auth::user()->level)}}</small>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <a class="dropdown-item" 
                    @if(Auth::user()->level == 'Administrator')
                      href="#"
                  @endif
                  >
                      <i class="dropdown-icon fe fe-user"></i> Profile
                    </a>
                    <!--
                    <a class="dropdown-item" href="#">
                      <i class="dropdown-icon fe fe-settings"></i> Log
                    </a>
-->
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                      <i class="dropdown-icon fe fe-log-out"></i> Sign out
                    </a>
                  </div>
                </div>
              </div>
              <a href="#" class="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
                <span class="header-toggler-icon"></span>
              </a>
            </div>
          </div>
        </div>
        <div class="bg-azure-darkest header collapse d-lg-flex p-0" id="headerMenuCollapse">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg order-lg-first">
                <ul class="nav nav-tabs border-0 flex-column flex-lg-row">
                  
                </ul>
              </div>
            </div>
          </div>
        </div>