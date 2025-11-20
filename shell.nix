{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    ruby_3_4
    bundler
    nodejs_22
    pkg-config
    libffi
    zlib
  ];

  shellHook = ''
    # Set up bundler to install gems in the project directory
    export GEM_HOME="$PWD/.nix-gems"
    export PATH="$GEM_HOME/bin:$PATH"
    mkdir -p "$GEM_HOME"
  '';
}
