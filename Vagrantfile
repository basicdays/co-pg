Vagrant.configure(2) do |config|
  config.vm.box = 'debian/jessie64'
  config.vm.hostname = 'co-pg.basicdays.com'

  config.vm.network 'private_network', ip: '10.20.200.20', nic_type: 'virtio'

  config.ssh.forward_agent = true

  config.vm.synced_folder '.', '/vagrant', type: 'rsync', rsync__exclude: %w(
    .idea .git node_modules config.json
  )

  host = RbConfig::CONFIG['host_os']
  if host =~ /darwin/
    cpus = `sysctl -n hw.ncpu`.to_i
    # sysctl returns Bytes and we need to convert to MB
    mem = `sysctl -n hw.memsize`.to_i / 1024 / 1024 / 4
  elsif host =~ /linux/
    cpus = `nproc`.to_i
    # meminfo shows KB and we need to convert to MB
    mem = `grep 'MemTotal' /proc/meminfo | sed -e 's/MemTotal://' -e 's/ kB//'`.to_i / 1024 / 4
  else # sorry Windows folks, I can't help you
    cpus = 2
    mem = 2048
  end

  config.vm.provider 'virtualbox' do |vb|
    vb.memory = mem
    vb.cpus = cpus
    vb.customize ['modifyvm', :id, '--vram', '12']
    vb.customize ['modifyvm', :id, '--nictype1', 'virtio']
    vb.customize ['modifyvm', :id, '--natdnshostresolver1', 'on']
    vb.customize ['modifyvm', :id, '--natdnsproxy1', 'on']
  end

  config.vm.provision :shell, path: 'provisioning/setup.sh'
  config.vm.provision :shell, path: 'provisioning/setup-project.sh'
  config.vm.provision :shell, path: 'provisioning/dev-tools.sh'
end
