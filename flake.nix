{
  inputs = {
    nixpkgs = {url = "github:NixOS/nixpkgs/nixpkgs-unstable";};
    flake-utils = {url = "github:numtide/flake-utils";};
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }: (flake-utils.lib.eachDefaultSystem (system: let
    pkgs = import nixpkgs {inherit system;};
  in {
    devShells.default = pkgs.mkShell {
      NODE_OPTIONS = "--openssl-legacy-provider";

      packages = with pkgs; [
        nodejs_20
      ];
    };

    formatter = pkgs.alejandra;
  }));
}
