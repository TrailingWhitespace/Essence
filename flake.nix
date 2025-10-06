{
  description = "A development shell for my personal organisation app";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs
          pnpm
          prisma
          prisma-engines
          postgresql
          docker
          docker-compose
          docker-buildx
        ];

        shellHook = ''
        export PKG_CONFIG_PATH="${pkgs.openssl.dev}/lib/pkgconfig";
        export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
        export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
        export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
        export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"

        # Create the Docker CLI plugin directory if it doesn't exist
          mkdir -p ~/.docker/cli-plugins
          
          # Symlink the buildx binary from the Nix store into the plugin directory.
          # This is the key step that makes the 'docker' command aware of the buildx plugin.
          ln -sf ${pkgs.docker-buildx}/bin/docker-buildx ~/.docker/cli-plugins/docker-buildx
          
          echo "✅ Docker buildx plugin has been linked for this shell session."
       
       
      '';
      };
    };
}