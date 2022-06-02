# DevOps - sample

## OS setup (Ubuntu)

```bash
sudo apt update
sudo apt install openssh-server
sudo systemctl status ssh
sudo ufw allow ssh
```

## Vagrant

### Install

```bash
sudo apt install vagrant virtualbox
```

### Setup

```bash
vagrant up
vagrant ssh control
```

### Copy over hosts file

```bash
sudo cp /vagrant/hosts /etc/hosts
```

## Ansible

### Install Ansible on control station

```bash
sudo apt-get install ansible
```

### Make hosts SSH accessible

```bash
ssh-keygen
ssh-copy-id node1 && ssh-copy-id node2 && ssh-copy-id node3
```

### Test Ansible

```bash
ansible nodes -i inventory -m command -a hostname
```

### Examle commnad (install python)

```bash
ansible nodes -i inventory -m command -a 'sudo apt-get -y install python-simplejson'
```

### Run the ansible playbook to install docker

```bash
ansible-playbook -i inventory -K playbook1.yml
```

## Docker

### Docker apps (on node1/2/3)

```bash
cd /vagrant/docker/python
docker-compose up --build
```

```bash
cd /vagrant/docker/node
docker-compose up --build
```

Testing (from control/node1/2/3)

```bash
curl node1:5000
curl node1:8080
```

### Docker swarm

Create and join swarm

```bash
docker swarm init
```

```bash
docker swarm join --token <token>
```

#### Create service

```bash
docker service create <image>
docker service create --name nodeapp --publish 8080:8080 ghornon/nodejs-test-app
```

```bash
docker service sale <name>=<count>
docker service sale nodeapp=3
```
