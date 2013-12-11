# -*- mode: ruby -*-
# vi: set ft=ruby :

BOX_NAME = ENV["BOX_NAME"] || "raring"
BOX_URI = ENV["BOX_URI"] || "https://cloud-images.ubuntu.com/vagrant/raring/current/raring-server-cloudimg-amd64-vagrant-disk1.box"
DOKKU_DOMAIN = "seismo.me"
DOKKU_IP = "10.0.0.3"

Vagrant::configure("2") do |config|
  config.vm.box = BOX_NAME
  config.vm.box_url = BOX_URI
  config.vm.synced_folder File.dirname(__FILE__), "/root/seismo"
  config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.hostname = "#{DOKKU_DOMAIN}"
  config.vm.network :private_network, ip: DOKKU_IP

  config.vm.provision :docker
end
