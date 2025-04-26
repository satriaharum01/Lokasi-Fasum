<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>{{ $title ?? 'Halaman' }} - {{ env('APP_NAME') }}</title>
    @include('backend.css')

    {{-- React Entry --}}
    @viteReactRefresh
    @vite('resources/js/main.jsx')
  </head>
  <body class="bg-white">
    <div class="page">
      <div class="page-main">

        {{-- Non-React content --}}
        @yield('content')

        {{-- React content --}}
        <div id="root"></div>

        
      </div>
    </div>
  </body>
</html>
